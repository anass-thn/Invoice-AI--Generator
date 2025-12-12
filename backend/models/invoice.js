const mongoose = require("mongoose");
const user = require("./user");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    textpercent: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
});
const InvoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true
    },
    billfrom: {
        businessName: String,
        address: String,
        phoneNumber: String,
    },
    billto: {
        clientName: String,
        address: String,
        phoneNumber: String,
        email: String,
    },
    items: [itemSchema],
    notes: { type: String },

    paymentTerms: { type: String, default: "Net 15" },

    status: { type: String, default: "unpaid", enum: ["unpaid", "paid", "partial", "overdue"] },
    subTotal: { type: Number },
    taxTotal: { type: Number },
    total: { type: Number },
},
    { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
