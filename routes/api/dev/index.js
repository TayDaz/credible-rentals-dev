const express = require("express");
const router = express.Router();
const GUIT = require("./generateGlobalUserIdToken");
// const decodeGUIT = require("./decodeGlobalUserIdToken");

router.use("/GUIT", GUIT);
// router.use("/decodeGUIT", decodeGUIT);

module.exports = router;
