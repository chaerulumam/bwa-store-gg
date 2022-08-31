const express = require("express");
const { signup, signin } = require("./controller");
var router = express.Router();

const multer = require("multer");
const os = require("os");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);
router.post("/signin", signin);

module.exports = router;
