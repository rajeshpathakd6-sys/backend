const Newsletter = require("../models/newsletter");

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const exists = await Newsletter.findOne({ email });

    if (exists) {
      return res.json({ message: "Already subscribed" });
    }

    await Newsletter.create({ email });

    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
