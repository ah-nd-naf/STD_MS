const express = require("express");
const router = express.Router();
const prisma = require("../db");
const verifyToken = require("../middleware/authMiddleware");

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private (Needs Token)

router.get("/profile", verifyToken, async (req, res) => {
    try {

        // 1. req.user was attached by the verifyToken middleware!
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId},
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true
                // excluded the pass & OTP section for security
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;