const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  });

  module.exports = mongoose.model("Review", ReviewSchema);