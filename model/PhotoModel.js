const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/sharing_photo');

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