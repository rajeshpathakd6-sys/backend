const router = require("express").Router();
const {
  subscribe,
  unsubscribe,
} = require("../controllers/newslettercontroller");

router.post("/", subscribe);
router.get("/unsubscribe/:token", unsubscribe);

module.exports = router;
