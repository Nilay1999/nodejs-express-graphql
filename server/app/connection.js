const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.dbUrl;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("MongoDB database connection failed");
    console.log(err);
  });

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

module.exports = mongoose;
