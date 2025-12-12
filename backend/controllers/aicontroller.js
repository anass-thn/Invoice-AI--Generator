const { GoogleGenerativeAI } = require("@google/generative-ai");
const Invoice = require("../models/invoiceModel");
const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const parseInvoiceFromText = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(text);
        const invoice = new Invoice({
            text,
            result
        });
        await invoice.save();
        return res.status(200).json({ invoice });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    parseInvoiceFromText
};

const genereateReminderEmail = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(text);
        const invoice = new Invoice({
            text,
            result
        });
        await invoice.save();
        return res.status(200).json({ invoice });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    parseInvoiceFromText,
    genereateReminderEmail
};

const geDashboardSummary = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent(text);
        const invoice = new Invoice({
            text,
            result
        });
        await invoice.save();
        return res.status(200).json({ invoice });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    parseInvoiceFromText,
    genereateReminderEmail,
    geDashboardSummary
};
