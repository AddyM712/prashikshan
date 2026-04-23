const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domain: { 
        type: String, 
        enum: ["Software Engineering", "Medical", "Business"], 
        required: true 
    },
    university: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);