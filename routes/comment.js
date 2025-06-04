const express = require('express');
const router = express.Router();

const Comment = require("../model/CommentModel");

router.post('/create', async (req, res) => {
    try {
        const { photoId, userId, username, content } = req.body;

        if (!photoId || !userId || !username || !content) {
            return res.status(400).json({ error: "Thiếu thông tin", photoId, userId, username, content });
        }

        const newComment = new Comment({ photoId, userId, username, content });
        await newComment.save();

        res.status(200).json({ success: true, comment: newComment });
    } catch (error) {
        console.error("Lỗi khi tạo comment:", error);
        res.status(500).json({ success: false, message: "Lỗi server khi tạo comment" });
    }
});

router.get('/commentOfPhoto', async (req, res) => {
    try {
        const { photoId } = req.query;
        if (!photoId) {
            return res.status(400).json({ err: "No photoId" });
        }
        const comments = await Comment.find({ photoId });
        res.status(200).json(comments);
    } catch (err) {
        console.log("Loi getComment", err);
        res.status(500).json({ err: "Loi server getComment" });
    }
})

module.exports = router
