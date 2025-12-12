const express = require("express");
const { parseInvoiceFromText, generateReminderEmail, getDashboardSummary } = require("../controllers/aicontroller");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/parse-invoice", protect, parseInvoiceFromText);
router.post("/generate-reminder", protect, generateReminderEmail);
router.post("/dashboard-summary", protect, getDashboardSummary);

module.exports = router;
