const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sharing_photo");

const CommentSchema = new mongoose.Schema({
    photoId: String,
    userId: String,
    username: String,
    content: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("comments", CommentSchema);
