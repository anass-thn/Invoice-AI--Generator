const express = require("express");
const { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require("../controllers/invoicecontroller");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getInvoices);
router.get("/:id", protect, getInvoiceById);
router.put("/:id", protect, updateInvoice);
router.delete("/:id", protect, deleteInvoice);

module.exports = router;
