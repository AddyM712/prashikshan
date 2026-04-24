const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, domain, university } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const student = new Student({ fullName, email, password: hashed, domain, university });
    await student.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message); // ✅ logs real error to Vercel
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, email: student.email, fullName: student.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, student: { fullName: student.fullName, email: student.email, domain: student.domain } });
  } catch (err) {
    console.error("Login error:", err.message); // ✅ logs real error to Vercel
    res.status(500).json({ message: "Server error: " + err.message });
  }
};