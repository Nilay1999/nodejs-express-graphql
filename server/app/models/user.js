const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
});

module.exports = mongoose.model("User", userSchema);
