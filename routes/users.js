const express = require('express');
const router = express.Router();

const User = require("../model/UserModel");

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (e) {
        console.log("Loi get  /users: ", e);
        res.status(500).json({ success: false, messenger: "Loi get /users" });
    }
})

router.get('/userDetail', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Khong co userId' });
        }
        const userDetail = await User.findOne({ _id: userId });
        if (!userDetail) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
        }
        res.json(userDetail);
    } catch (e) {
        console.log("Loi get  /users: ", e);
        res.status(500).json({ success: false, messenger: "Loi get /users" });
    }
})

module.exports = router