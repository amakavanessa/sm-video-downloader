const mongoose = require("mongoose");
const vidUrlSchema = new mongoose.Schema({
  url: {
    type: String,
  },

  upload_time: {
    type: Date,
    default: Date.now(),
  },

  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const VidUrl = mongoose.model("VidUrl", vidUrlSchema);

module.exports = VidUrl;
