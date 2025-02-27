const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ["academic", "college", "hall", "chapel", "general"], 
        required: true 
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: { 
        type: String, 
        enum: ["submitted", "top_3", "under_review", "approved", "rejected"], 
        default: "submitted" 
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    votes: { 
        type: Number, 
        default: 0 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Petition", PetitionSchema);
