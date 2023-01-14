var express = require("express");
var router = express.Router();

var { MessagingResponse } = require("twilio").twiml;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sms", (req, res) => {
  const body = req.body.Body;

  const twiml = new MessagingResponse();
  const message = twiml.message();

  if (body.toLowerCase() === "map") {
    message.body("Thanks for your inquiry! Here's a map to the yoga studio:");
    message.media("/images/yoga_map.png");
  } else {
    message.body(`Unrecognized request. Try "map"`);
  }

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;
