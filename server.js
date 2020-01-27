const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 6000;

app.use(morgan("dev"));
require("dotenv").config();

app.use("/api", require("./api"));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(port, () => {
  console.log(`Running in ${port}`);
});
