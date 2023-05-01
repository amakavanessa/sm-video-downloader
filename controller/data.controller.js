const puppeteer = require("puppeteer");
const catchAsync = require("../utils/catch_async");
const RUDctrl = require("./RUD.controller");
const VidUrl = require("../model/data.model");

exports.getUrl = catchAsync(async (req, res) => {
  const { query } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the navigation timeout to 60 seconds
  page.setDefaultNavigationTimeout(0);
  await page.goto(query);

  await page.waitForSelector("video");

  const videoSource = await page.evaluate(() => {
    const videoElement = document.querySelector("video");
    return videoElement.src;
  });

  const doc = await VidUrl.create({
    url: videoSource,
  });

  console.log(videoSource);

  res.status(200).json({
    status: "success",
    message: doc,
  });
  browser.close();
});

exports.getAll = async (req, res) => {
  const data = await RUDctrl.getAll(VidUrl);
  res.status(200).json({
    status: "success",
    data,
  });
};
