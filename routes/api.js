const express = require("express");

const router = express.Router();

const PasswordCard = require("../models/PasswordCard");

router.get("", (req, res) => {
  PasswordCard.find({})
    .then((data) => {
      if (data.length) {
        res.json(data);
      } else {
        res.json({
          Error: "No data is present"
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/save", (req, res) => {
  const data = req.body;

  const newPasswordCard = new PasswordCard(data);

  newPasswordCard.save((err) => {
    if (err) {
      res.status(500).json({
        Error: err
      });
      return;
    }
  })

  res.json({
    msg: 'You data has been saved to the database'
  });
});

router.delete("/:id", (req, res) => {
  PasswordCard.deleteOne({
    _id: req.params.id
  }).then((data) => res.json(data)).catch((err) => console.log(err))
});

module.exports = router;