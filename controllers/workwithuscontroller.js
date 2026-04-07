const Work = require("../models/workwithus");

exports.submitWork = async (req, res) => {
  try {
    const data = {
      ...req.body,
      resume: req.file ? req.file.filename : null,
    };

    await Work.create(data);

    res.json({ message: "Proposal submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
