const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    petition: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Petition", 
        required: true },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

VoteSchema.index({ user: 1, petition: 1 }, { unique: true }); // Prevents duplicate votes

module.exports = mongoose.model("Vote", VoteSchema);
