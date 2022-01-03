const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PasswordCardSchema = new Schema({
  title: String,
  dateTime: String,
  password: String,
});

const PasswordCard = mongoose.model("PasswordCard", PasswordCardSchema);

module.exports = PasswordCard;