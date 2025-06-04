const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/sharing_photo');

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    location: { type: String },
    description: { type: String },
    occupation: { type: String },
});

module.exports = mongoose.model("users", userSchema);