const router = require("express").Router();
const { subscribe } = require("../controllers/newslettercontroller");

router.post("/", subscribe);

module.exports = router;
