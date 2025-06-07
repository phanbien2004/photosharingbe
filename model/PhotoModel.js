const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://username123:PRQuKf4ZayNEvCKN@cluster.ncqn9r4.mongodb.net/photosharing?retryWrites=true&w=majority&appName=Cluster');

const PhotoSchema = new mongoose.Schema({
  date_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  file_name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("photos", PhotoSchema);