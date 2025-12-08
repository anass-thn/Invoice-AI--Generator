require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

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

    //Middleware
    app.use(express.json());

    //Routes

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    