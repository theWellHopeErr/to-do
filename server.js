const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session")

const app = express();
const port = process.env.PORT || 5000;
const server = require("http").Server(app)

app.use(session({
  name: "sessionID",
  secret: "TheSecretWillRemainSecretOnlyUntilTheSecretisKeptASecret",
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  resave: true,
  saveUninitialized: false
}))

app.use(morgan("dev"));
require("dotenv").config();

app.use("/api", require("./api"));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

server.listen(port, () => {
  console.log(`Running in ${port}`);
});