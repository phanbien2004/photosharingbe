const express = require('express');
const router = express.Router();

const Authentication = require('../model/AuthenticationModel');
const User = require('../model/UserModel');

router.put('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const authentication = await Authentication.findOne({ username, password });
        if (!authentication) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const user = await User.findOne({ _id: authentication.userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            message: "Login successful!",
            user: user,
        });

    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password, fullname, location, description, occupation } = req.body;
        if (!username || !password || !fullname || !location || !description || !occupation) {
            return res.status(400).json({ err: "Thieu du lieu: ", username, password, fullname, location, description, occupation });
        }
        const parts = fullname.trim().split(/\s+/);
        const first_name = parts[0];
        const last_name = parts.slice(1).join(" ");
        const user = new User({ first_name, last_name, location, description, occupation });
        await user.save();
        if (!user) {
            console.log("Loi luu user Signup");
            return res.status(500).json({ err: "Loi server signUp" });
        } else {
            const userId = user._id;
            const authentication = new Authentication({ username, password, userId });
            await authentication.save();
            return res.status(200).json({ user: user });
        }

    } catch (e) {
        console.log("Loi signUp: ", e);
        return res.status(500).json({ err: "Loi server signUp" });
    }
})

module.exports = router;
