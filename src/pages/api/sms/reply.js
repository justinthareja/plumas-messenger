const { MessagingResponse } = require("twilio").twiml;

export default function handler(req, res) {
  if (req.method === "POST") {
    const twiml = new MessagingResponse();
    const message = twiml.message();
    const body = req.body.Body.toLowerCase().trim();

    if (body === "map") {
      message.body(
        "Thanks for your interest! Here's a map to the yoga studio."
      );
      message.media("/images/yoga_map.jpg");
    } else if (body === "schedule") {
      message.body(
        "Thanks for your interest! Here's a link to the schedule: https://www.plumasyoga.com/"
      );
    } else {
      message.body(
        `Thanks for messaging the plumas yoga cooperative, this is an automated service. \n\nIf you're looking for a map to the yoga studio reply with MAP. \n\nIf you'd like to know more about upcoming classes reply with SCHEDULE.`
      );
    }

    res
      .setHeader("Content-Type", "text/xml")
      .status(200)
      .send(twiml.toString());
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Idk what to do unless you POST" });
  }
}
