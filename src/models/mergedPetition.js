const mongoose = require("mongoose");

const MergedPetitionSchema = new mongoose.Schema({
    petitions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Petition", 
        required: true 
    }],
    mergedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Council Member
    mergedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("MergedPetition", MergedPetitionSchema);
