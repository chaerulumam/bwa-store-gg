const express = require("express");
const { signup } = require("./controller");
var router = express.Router();

const multer = require("multer");
const os = require("os");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);

module.exports = router;
