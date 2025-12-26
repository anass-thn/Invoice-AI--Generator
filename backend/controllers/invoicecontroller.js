const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoice");

// Create Invoice
// @route POST /api/invoices
// @access Private
exports.createInvoice = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const {
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
        } = req.body;

        //subtotal calculation
        let subtotal = 0;
        let taxTotal = 0;
        items.forEach((item) => {
            subtotal += item.price * item.quantity;
            taxTotal += item.price * item.quantity * item.tax / 100;
        });
        const total = subtotal + taxTotal;
        const invoice = await Invoice.create({
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
            subtotal,
            taxTotal,
            total,
            user,
        });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(400);
        throw new Error(error.message || "Invalid invoice data");
    }
});

// Get all invoices
// @route GET /api/invoices
// @access Private
exports.getInvoices = asyncHandler(async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user._id });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});

// Get single invoice
// @route GET /api/invoices/:id
// @access Private
exports.getInvoiceById = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate("user", "name email");
        if (!invoice) {
            res.status(404);
            throw new Error("Invoice not found");
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});

// Update invoice
// @route PUT /api/invoices/:id
// @access Private
exports.updateInvoice = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            res.status(404);
            throw new Error("Invoice not found");
        }
        invoice.invoiceNumber = req.body.invoiceNumber || invoice.invoiceNumber;
        invoice.invoiceDate = req.body.invoiceDate || invoice.invoiceDate;
        invoice.dueDate = req.body.dueDate || invoice.dueDate;
        invoice.billFrom = req.body.billFrom || invoice.billFrom;
        invoice.billTo = req.body.billTo || invoice.billTo;
        invoice.items = req.body.items || invoice.items;
        invoice.notes = req.body.notes || invoice.notes;
        invoice.paymentTerms = req.body.paymentTerms || invoice.paymentTerms;
        await invoice.save();
        res.status(200).json(invoice);
        //recalculate total
        let subtotal = 0;
        let taxTotal = 0;
        invoice.items.forEach((item) => {
            subtotal += item.price * item.quantity;
            taxTotal += item.price * item.quantity * item.tax / 100;
        });
        const total = subtotal + taxTotal;
        invoice.subtotal = subtotal;
        invoice.taxTotal = taxTotal;
        invoice.total = total;
        await invoice.save();
        res.status(200).json(invoice);

    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});

// Update invoice status
// @route PATCH /api/invoices/:id/status
// @access Private
exports.updateInvoiceStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
        const validStatuses = ['paid', 'unpaid', 'partial', 'overdue'];
        if (!status || !validStatuses.includes(status)) {
            res.status(400);
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            res.status(404);
            throw new Error("Invoice not found");
        }

        // Check if user owns this invoice
        if (invoice.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Not authorized to update this invoice");
        }

        invoice.status = status;
        await invoice.save();

        res.status(200).json(invoice);
    } catch (error) {
        res.status(error.status || 400);
        throw new Error(error.message || "Failed to update invoice status");
    }
});

// Delete invoice
// @route DELETE /api/invoices/:id
// @access Private
exports.deleteInvoice = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            res.status(404);
            throw new Error("Invoice not found");
        }
        res.status(200).json({ message: "Invoice deleted" });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});
