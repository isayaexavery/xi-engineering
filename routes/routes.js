const express = require("express");
const router = express.Router();
const messageSchema = require("../models/MessageModel");

router.post("/signup", (req, res) => {
  res.send("send");
});

router.post("/contact", (req, res) => {
  const newMessage = new messageSchema({
    name: req.body.namee,
    email: req.body.email,
    number: req.body.number,
    subject: req.body.subject,
    message: req.body.message,
  });

  newMessage
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
