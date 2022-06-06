const express = require("express");
const app = express();
// const morgan = require('morgan');
const path = require("path");
const bodyParser = require("body-parser");

const api = require("./api");

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json()); // maybe needed
app.use(bodyParser.urlencoded({ extended: true })); // definitely needed

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "The heck you doin'?");
});

module.exports = app;
