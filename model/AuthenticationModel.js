const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sharing_photo");

const AuthenticationSchema = new mongoose.Schema({
    username: String,
    password: String,
    userId: String,
})

module.exports = mongoose.model("authentications", AuthenticationSchema);
