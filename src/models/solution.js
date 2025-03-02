const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
  petition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Petition",
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Solution", SolutionSchema);
