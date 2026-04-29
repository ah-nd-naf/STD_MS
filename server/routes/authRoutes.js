const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../db");
const sendMail = require("../utils/sendEmail");

// Signup Route
router.post("/signup", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // 1. Check if user exists
        const userExists = await prisma.user.findUnique({ where: { email: email } });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes from now

        // 4. Save to Database
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: role || "student",
                otp: otp,
                otpExpiry: otpExpiry
            }
        });

        // 5. Send the OTP Email
        await sendMail(email, otp);

        res.status(201).json({ message: "Signup successful! Please check your email for the OTP." });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        // 1. Find user by email
        const dbUser = await prisma.user.findUnique({ where: { email: email } });

        if (!dbUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Check if OTP matches
        if (dbUser.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // 3. Check if OTP is expired (Make sure to use otpExpiry, not otp_expiry)
        if (new Date() > dbUser.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired. Please signup again." });
        }

        // 4. Success! Update user status
        await prisma.user.update({
            where: { email: email },
            data: {
                isVerified: true,
                otp: null,
                otpExpiry: null
            }
        });

        res.status(200).json({ message: "Email verified successfully! You can now log in." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        // 3. Compare the entered password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4. Generate a JWT Token
        const token = jwt.sign(
            { userId: user.id, role: user.role }, // Payload
            process.env.JWT_SECRET,               // Secret from your .env
            { expiresIn: "1h" }                   // Token expiry
        );

        // 5. Send back the token and user info (excluding password)
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
