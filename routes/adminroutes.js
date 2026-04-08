const express = require("express");
const router = express.Router();

const Contact = require("../models/contactus");
const Newsletter = require("../models/newsletter");
const Work = require("../models/workwithus");

// GET all contacts
router.get("/contacts", async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
});

// GET all newsletters
router.get("/newsletters", async (req, res) => {
  const data = await Newsletter.find().sort({ createdAt: -1 });
  res.json(data);
});

// GET all work submissions
router.get("/works", async (req, res) => {
  const data = await Work.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
