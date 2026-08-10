const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
console.log("🚀 THIS IS THE CORRECT SERVER.JS");
const express = require("express");
const cors = require("cors");


const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const User = require("./models/User");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/test", (req, res) => {
    res.send("API is working");
});

app.post("/api/auth/register", (req, res) => {
    res.json({
        message: "Direct Register Route Working"
    });
});
// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to GlobeVista Backend");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});