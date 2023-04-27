const catchAsync = require("../utils/catch_async");
const RUDctrl = require("./RUD.controller");
const VidUrl = require("../model/data.model");
exports.getSearchPage = catchAsync(async (req, res) => {
  const files = await VidUrl.find({}).select("url");
  res.render("index", { files });
});
