const { GoogleGenerativeAI } = require("@google/generative-ai");
const Invoice = require("../models/invoice");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parseInvoiceFromText = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }
    try {
        const systemPrompt = `You are an expert invoice data extractor AI. Analyze the following text and extract the relevant information to create an invoice. The output should be in JSON format with the following structure:
        {
            "invoiceNumber": "string",
            "invoiceDate": "YYYY-MM-DD",
            "dueDate": "YYYY-MM-DD",
            "billto": {
                "clientName": "string",
                "email": "string",
                "phoneNumber": "string",
                "address": "string"
            },
            "items": [
                {
                    "name": "string",
                    "quantity": number,
                    "unitPrice": number,
                    "total": number
                }
            ],
            "subTotal": number,
            "taxTotal": number,
            "total": number,
            "notes": "string (optional)"
        }
        
        Here is the text to parse:
        ---
        ${text}
        ---
        
        Extract the data and provide ONLY the JSON object, no additional text.`;

        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(systemPrompt);
        let responseText = result.response.text();

        if (typeof responseText !== "string") {
            throw new Error("Could not extract invoice data");
        }

        // Clean the response (remove markdown code blocks if present)
        const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        // Create invoice with proper schema structure
        const invoice = new Invoice({
            user: req.user._id,
            invoiceNumber: parsedData.invoiceNumber,
            invoiceDate: parsedData.invoiceDate || new Date(),
            dueDate: parsedData.dueDate,
            billto: parsedData.billto,
            items: parsedData.items,
            subTotal: parsedData.subTotal,
            taxTotal: parsedData.taxTotal,
            total: parsedData.total,
            notes: parsedData.notes || "",
            status: "unpaid"
        });

        await invoice.save();

        return res.status(200).json({
            success: true,
            invoice,
            parsedData
        });
    } catch (error) {
        console.error("Error parsing invoice:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const generateReminderEmail = async (req, res) => {
    const { invoiceId, customMessage } = req.body;

    if (!invoiceId) {
        return res.status(400).json({ message: "Invoice ID is required" });
    }

    try {
        // Fetch the invoice
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        if (invoice.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access to invoice" });
        }

        const prompt = `You are a professional and polite accounting assistant. Write a friendly reminder email to the client about an overdue or upcoming invoice payment.

Use the following details to personalize the email:
- Invoice Number: ${invoice.invoiceNumber}
- Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
- Total Amount: $${invoice.total}
- Client Name: ${invoice.billto?.clientName || "Valued Customer"}
${customMessage ? `- Additional Note: ${customMessage}` : ""}

The tone should be friendly but clear. Keep it concise and professional.

Start the email with "Subject:" followed by the subject line, then write the email body.

Format the response as JSON:
{
    "subject": "subject line here",
    "body": "email body here"
}`;

        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean and parse the response
        const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, '').trim();
        const emailData = JSON.parse(cleanedJson);

        return res.status(200).json({
            success: true,
            email: emailData,
            invoiceNumber: invoice.invoiceNumber
        });
    } catch (error) {
        console.error("Error generating reminder email:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getDashboardSummary = async (req, res) => {
    try {
        // Fetch all invoices for the user
        const invoices = await Invoice.find({ user: req.user._id });

        if (!invoices || invoices.length === 0) {
            return res.status(200).json({
                success: true,
                summary: {
                    totalInvoices: 0,
                    totalRevenue: 0,
                    paidInvoices: 0,
                    unpaidInvoices: 0,
                    overdueInvoices: 0,
                    insights: "No invoices found. Start creating invoices to see insights."
                }
            });
        }

        // Calculate statistics
        const stats = {
            totalInvoices: invoices.length,
            totalRevenue: invoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
            paidInvoices: invoices.filter(inv => inv.status === "paid").length,
            unpaidInvoices: invoices.filter(inv => inv.status === "unpaid").length,
            overdueInvoices: invoices.filter(inv => inv.status === "overdue").length,
            partialInvoices: invoices.filter(inv => inv.status === "partial").length
        };

        // Parse and summarize data
        const dataSummary = `Total Invoices: ${stats.totalInvoices}, Total Revenue: $${stats.totalRevenue.toFixed(2)}, Paid: ${stats.paidInvoices}, Unpaid: ${stats.unpaidInvoices}, Overdue: ${stats.overdueInvoices}, Partial: ${stats.partialInvoices}`;

        const prompt = `You are a friendly and insightful financial analyst for a small business owner. Based on the following summary of their invoice data, provide 2-3 concise and actionable insights. Each insight should be a short sentence in a JSON array.

The insights should be encouraging and helpful. Do not just repeat the data.

For example, if there is a high outstanding amount, suggest sending reminders. If revenue is high, be encouraging.

Data summary: ${dataSummary}

Return your response as a valid JSON object with a single key "insights" which is an array of strings.

Example format: { "insights": ["Your revenue is looking strong this month!", "You have 5 overdue invoices. Consider sending reminders to get paid faster."] }`;

        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean and parse the response
        const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, '').trim();
        const aiResponse = JSON.parse(cleanedJson);

        return res.status(200).json({
            success: true,
            statistics: stats,
            insights: aiResponse.insights
        });
    } catch (error) {
        console.error("Error generating dashboard summary:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    parseInvoiceFromText,
    generateReminderEmail,
    getDashboardSummary
};
