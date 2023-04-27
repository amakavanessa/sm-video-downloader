const express = require("express");
const path = require("path");

const file_routes = require("./routes/file.routes");
const view_routes = require("./routes/views.routes");

const err = require("./error/custom_error");
const error_handler = require("./error/error_handler");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));

app.listen(process.env.PORT, () => {
  console.log("App is running on port 3000");
});

app.use("/", view_routes);
app.use("/file", file_routes);

app.all("*", (req, res, next) => {
  throw new err(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(error_handler);

module.exports = app;
