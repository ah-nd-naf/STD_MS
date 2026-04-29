const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const sendMail = require("../utils/sendEmail");

// Signup Route
router.post("/signup", async  (req, res) => {
    const { email, password, role } = req.body;

    try {
        //1. Check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({message: "User already exists"});
        }

        //2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //3. Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60000);  // 5 minutes from now

        //4. Save to Database
        const newUser = await pool.query(
            "INSERT INTO users (email, password, role, otp, otp_expiry) VALUES ($1, $2, $3, $4, $5) RETURNING *",  
            [email, hashedPassword, role || "student", otp, otpExpiry]
        );
        
        //5. Send the OTP Email
        await sendMail(email, otp);

        res.status(201).json({message: "Signup successful! Please check your eamil for the OTP."});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const dbUser = user.rows[0];

    // Check if OTP matches
    if (dbUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (new Date() > dbUser.otp_expiry) {
      return res.status(400).json({ message: "OTP has expired. Please signup again." });
    }

    // Success! Update user status
    await pool.query(
      "UPDATE users SET is_verified = true, otp = NULL, otp_expiry = NULL WHERE email = $1",
      [email]
    );

    res.status(200).json({ message: "Email verified successfully! You can now log in." });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;