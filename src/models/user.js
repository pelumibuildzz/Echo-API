const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    }, // CU email
    password: { 
        type: String, 
        required: true 
    }, // Hashed
    role: { 
        type: String, 
        enum: ["student", "council"], 
        default: "student" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("User", UserSchema);
