const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://username123:PRQuKf4ZayNEvCKN@cluster.ncqn9r4.mongodb.net/photosharing?retryWrites=true&w=majority&appName=Cluster");

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
