const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRoute = require("./auth");
const userRoute = require("./user");
const imageRoute = require("./image");
const addsRoute = require("./adds");

//*************DEV ***************/
const devRoute = require("./dev");
//*************DEV ***************/

//Authentication route for signup and login
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/dev", devRoute);
router.use("/image", imageRoute);
router.use("/adds", addsRoute);

module.exports = router;
