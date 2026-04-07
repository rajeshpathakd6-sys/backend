console.log("STARTING SERVER...");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (UPDATED NAMES)
app.use("/api/newsletter", require("./routes/newsletterroutes"));
app.use("/api/contact", require("./routes/contactusroutes"));
app.use("/api/work-with-us", require("./routes/workwithusroutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

app.use("/api/admin", require("./routes/adminroutes"));
