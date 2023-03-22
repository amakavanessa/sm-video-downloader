const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const app = express();
const files = fs.readdirSync("static/downloaded files/");
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  // res.render("index");'
  res.render("index", { files });
});

app.post("/search", async (req, res) => {
  const { query } = req.body;
  const randomNum = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);

  // Navigate to the Twitter tweet where the video is located.
  await page.goto(query);

  // Wait for the video element to be loaded.
  await page.waitForSelector("video", {
    waitUntil: "networkidle2",
  });

  // Get the source URL of the video.
  const videoUrl = await page.$eval("video", (el) => el.src);
  console.log(`${videoUrl} and ${query}`);
  // Use axios to download the video content as a stream.
  const videoStream = await axios({
    url: videoUrl,
    method: "GET",
    responseType: "stream",
  });

  // Use Node.js built-in `fs` module to write the video stream to a file.

  const videoFile = fs.createWriteStream(
    `static/downloaded files/video${randomNum}.mp4`
  );

  videoStream.data.pipe(videoFile);
  videoFile.on("finish", () => {
    console.log("Video downloaded successfully!");
  });

  browser.close();
});

const server = app.listen(3000, () => {
  console.log("App is running on port 3000");
});
