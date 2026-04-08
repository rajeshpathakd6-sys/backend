const Newsletter = require("../models/newsletter");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const exists = await Newsletter.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    await Newsletter.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    console.error("Newsletter Error:", err.message);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
