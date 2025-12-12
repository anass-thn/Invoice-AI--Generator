const express = require("express");
const {parseInvoiceFromText, genereateReminderEmail, geDashboardSummary} = require("../controllers/aiController");
const{protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/parse-invoice", protect, parseInvoiceFromText);
router.post("/generate-reminder", protect, genereateReminderEmail);
router.post("/dashboard-summary", protect, geDashboardSummary);

module.exports = router;
