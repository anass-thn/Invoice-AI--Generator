const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// Helper : Generate JWT
const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register New User
// @route POST /api/auth/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Register attempt:", { name, email }); // Log input (don't log password)

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log("User already exists:", email);
        res.status(400);
        throw new Error("User already exists");
    }

    // Create user (password hashing handled by model middleware)
    console.log("Creating user...");
    const user = await User.create({
        name,
        email,
        password,
    });
    console.log("User created:", user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Login User
// @route POST /api/auth/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists (include password for comparison)
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            businessName: user.businessName || '',
            adress: user.adress || '',
            phoneNumber: user.phoneNumber || '',
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

//get current user
// @route GET /api/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            businessName: user.businessName || '',
            adress: user.adress || '',
            phoneNumber: user.phoneNumber || '',
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//update user profile
// @route PUT /api/auth/update-profile
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.businessName = req.body.businessName || user.businessName;
        user.adress = req.body.adress || user.adress;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            businessName: user.businessName || '',
            adress: user.adress || '',
            phoneNumber: user.phoneNumber || '',
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
