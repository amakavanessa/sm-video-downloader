const express = require("express");
const viewController = require("../controller/views.controlller");
const getLinkCtrl = require("../controller/data.controller");
const router = express.Router();

router.get("/", viewController.getSearchPage);
router.route("/search").post(getLinkCtrl.getUrl);
router.route("/getAll").get(getLinkCtrl.getAll);
module.exports = router;

//link files to users
