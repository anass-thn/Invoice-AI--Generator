require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();

// Middleware
app.use(express.json());

// Middleware to handle cors
app.use(
    cors(
        {
            origin: "*",
            methods: "GET,PUT,POST,DELETE",
            allowedHeaders: "Content-Type,Authorization",
        }
    ));

//connect to db 
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
