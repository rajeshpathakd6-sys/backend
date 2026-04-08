const Newsletter = require("../models/newsletter");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // check existing
    const exists = await Newsletter.findOne({ email });

    if (exists) {
      return res.status(200).json({
        success: true,
        message: "Already subscribed",
      });
    }

    // create
    await Newsletter.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    console.error("Newsletter Error:", err.message);

    // handle duplicate key error (extra safety)
    if (err.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Already subscribed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
