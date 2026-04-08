const Work = require("../models/workwithus");

exports.submitWork = async (req, res) => {
  try {
    const { name, email } = req.body;

    // basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const data = {
      ...req.body,
      resume: req.file ? req.file.filename : null,
    };

    await Work.create(data);

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully",
    });
  } catch (err) {
    console.error("WorkWithUs Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
