const router = require("express").Router();

const Newsletter = require("../models/newsletter");
const Contact = require("../models/contactus");
const Work = require("../models/workwithus");

// GET ALL DATA
router.get("/data", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const works = await Work.find().sort({ createdAt: -1 });

    res.json({
      newsletters,
      contacts,
      works,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
