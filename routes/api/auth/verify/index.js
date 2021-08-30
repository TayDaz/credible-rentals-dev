const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
	smsOtpController,
	emailController,
} = require("../../../controllers/auth/verify");

router.post("/smsOtp", smsOtpController);

router.post("/email", emailController);

module.exports = router;
