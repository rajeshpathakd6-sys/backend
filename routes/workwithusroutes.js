const router = require("express").Router();
const multer = require("multer");
const { submitWork } = require("../controllers/workwithuscontroller");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), submitWork);

module.exports = router;
