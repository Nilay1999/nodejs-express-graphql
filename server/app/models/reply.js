const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
});

module.exports = mongoose.model("Reply", replySchema);
