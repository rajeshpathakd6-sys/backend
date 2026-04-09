console.log("STARTING SERVER...");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://www.routesandreflections.in",
      "https://routesandreflections.in",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/newsletter", require("./routes/newsletterroutes"));
app.use("/api/contact", require("./routes/contactusroutes"));
app.use("/api/workwithus", require("./routes/workwithusroutes"));
app.use("/api/admin", require("./routes/adminroutes")); // ✅ moved up

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
