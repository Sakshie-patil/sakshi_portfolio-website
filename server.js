require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "src")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// POST route for form submission
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

try {
    // Use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // 🔑 from .env
        pass: process.env.EMAIL_PASS,   // 🔑 from .env
      },
    });


    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,       // Receive messages in your email
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };


    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
