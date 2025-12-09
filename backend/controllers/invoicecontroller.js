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
        res.status(400);
        throw new Error("Invalid invoice data");
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
        const invoice = await Invoice.findById(req.params.id);
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
        invoice.title = req.body.title || invoice.title;
        invoice.amount = req.body.amount || invoice.amount;
        invoice.dueDate = req.body.dueDate || invoice.dueDate;
        await invoice.save();
        res.status(200).json(invoice);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});

// Delete invoice
// @route DELETE /api/invoices/:id
// @access Private
exports.deleteInvoice = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            res.status(404);
            throw new Error("Invoice not found");
        }
        await invoice.remove();
        res.status(200).json({ message: "Invoice deleted" });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});
