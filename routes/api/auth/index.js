const express = require("express");
const router = express.Router();
const { check, oneOf, validationResult } = require("express-validator");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
	signupFieldValidationRulesLocal,
	signupFieldValidationRulesSocial,
	loginValidationRules,
	validate,
} = require("../../middlewares/fieldValidator");

const {
	authJwtSignupMiddleware,
	authJwtPasswordResetMiddleware,
	authJwtForgotPasswordMiddleware,
	signupUserFieldMiddleware,
} = require("../../middlewares/auth");

const {
	loginController,
	signupController,
	facebookController,
	googleController,
	twitterController,
	passwordResetController,
	forgotPasswordController,
} = require("../../controllers/auth");

const verifyRoute = require("./verify");
const UserModel = require("../../../db/model/user");

//signup
router.post(
	"/signup",
	authJwtSignupMiddleware,
	signupUserFieldMiddleware,
	signupController
);

//login
router.post("/login", loginController);

//facebook
router.get(
	"/facebook",
	passport.authenticate("facebook", {
		session: false,
		scope: ["profile", "email"],
	})
);

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", { session: false }),
	facebookController
);

//Google
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", { session: false }),
	googleController
);

//Twitter
//Google
router.get(
	"/twitter",
	passport.authenticate("twitter", {
		// scope: ["profile", "email"],
		session: false,
	})
);

router.get(
	"/twitter/callback",
	passport.authenticate("twitter", { session: false }),
	twitterController
);

//////////////////////
router.post(
	"/passwordReset",
	authJwtPasswordResetMiddleware,
	passwordResetController
);

router.post(
	"/forgotPassword",
	authJwtForgotPasswordMiddleware,
	forgotPasswordController
);

//SMS OTP verification
router.use("/verify", verifyRoute);

module.exports = router;
