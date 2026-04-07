const router = require("express").Router();
const { submitContact } = require("../controllers/contactuscontroller");

router.post("/", submitContact);

module.exports = router;
