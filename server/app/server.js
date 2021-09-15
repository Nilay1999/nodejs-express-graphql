const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();
require("./connection");
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
