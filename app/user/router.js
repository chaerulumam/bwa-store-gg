const express = require("express");
const { viewUser, actionUserSignIn, actionLogout } = require("./controller");
const router = express.Router();

router.get("/", viewUser);
router.post("/", actionUserSignIn);
router.get("/logout", actionLogout);

module.exports = router;
