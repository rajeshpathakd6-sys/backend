const Contact = require("../models/contactus");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry
    await Contact.create({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Contact Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
