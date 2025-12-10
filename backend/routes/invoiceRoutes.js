const express = require("express");
const { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require("../controllers/invoicecontroller");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/", authMiddleware, createInvoice);
router.get("/", authMiddleware, getInvoices);
router.get("/:id", authMiddleware, getInvoiceById);
router.put("/:id", authMiddleware, updateInvoice);
router.delete("/:id", authMiddleware, deleteInvoice);

module.exports = router;
