var express = require("express");
var router = express.Router();

var { MessagingResponse } = require("twilio").twiml;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sms", (req, res) => {
  const smsCount = req.session.counter || 0;
  const body = req.body.Body;

  const twiml = new MessagingResponse();
  const message = twiml.message();

  if (body.toLowerCase() === "map") {
    message.media(
      "https://plumascounty.org/wp-content/uploads/2022/04/Plumas-County-with-regions-1024x1024.jpg"
    );
  } else {
    message.body(`This is your ${smsCount} request`);
  }

  req.session.counter = smsCount + 1;

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;
