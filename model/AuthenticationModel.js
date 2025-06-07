const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://username123:PRQuKf4ZayNEvCKN@cluster.ncqn9r4.mongodb.net/photosharing?retryWrites=true&w=majority&appName=Cluster"
);

const AuthenticationSchema = new mongoose.Schema({
  username: String,
  password: String,
  userId: String,
});

module.exports = mongoose.model("authentications", AuthenticationSchema);
