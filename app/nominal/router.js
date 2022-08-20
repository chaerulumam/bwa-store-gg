const express = require("express");
const { index, viewCreate } = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);

module.exports = router;
