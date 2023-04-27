const express = require("express");
const router = express.Router();
const getLinkCtrl = require("../controller/data.controller");

router.route("/search").post(getLinkCtrl.getUrl);

router.route("/").get(getLinkCtrl.getAll);

module.exports = router;
