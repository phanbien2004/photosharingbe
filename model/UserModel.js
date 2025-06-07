const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://username123:PRQuKf4ZayNEvCKN@cluster.ncqn9r4.mongodb.net/photosharing?retryWrites=true&w=majority&appName=Cluster');

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    location: { type: String },
    description: { type: String },
    occupation: { type: String },
});

module.exports = mongoose.model("users", userSchema);