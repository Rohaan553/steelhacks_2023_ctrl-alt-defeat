const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
      unique: true
    },
    questions: [{
      question: {
        type: String,
        required: true
      },
      answers: [
        {
          answer: {
            type: String,
            required: true
          },
          votes: {
            type: Number,
            default: 0
          }
        }
      ] 
    }]
  });

  
module.exports = mongoose.model("Video", VideoSchema);