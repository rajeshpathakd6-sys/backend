const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Decide which DB to use
    const dbURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI // Cloud (Atlas)
        : process.env.MONGO_LOCAL; // Local MongoDB

    await mongoose.connect(dbURI);

    console.log(`✅ MongoDB connected (${process.env.NODE_ENV})`);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
