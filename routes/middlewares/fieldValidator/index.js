const { check, validationResult } = require("express-validator");
const { ALLOWED_MOBILE_COUNTRIES } = require("../../../constants");

const signupFieldValidationRulesLocal = () => [
	check("provider")
		.exists()
		.isLength({ min: 5 })
		.trim()
		.escape()
		.withMessage("Provider must be present"),
	check("firstName")
		.exists()
		.isLength({ min: 1 })
		.trim()
		.escape()
		.withMessage("First Name must have more than 5 characters"),
	check("lastName")
		.exists()
		.isLength({ min: 1 })
		.trim()
		.escape()
		.withMessage("Last Name must have more than 5 characters"),
	check("username")
		.exists()
		.isLength({ min: 5 })
		.trim()
		.escape()
		.withMessage("Username must have more than 5 characters"),
	check("email", "Your email is not valid").exists().normalizeEmail(),
	check("password", "Your password must be at least 5 characters")
		.exists()
		.isLength({ min: 5 }),
	check("confirmPassword", "Passwords do not match").custom(
		(value, { req }) => value === req.body.password
	),
	check("residenceAddress", "Your Residence address must be present")
		.exists()
		.isLength({ min: 10 }),
	// check("mobileNumber").isMobilePhone(ALLOWED_MOBILE_COUNTRIES),
	check("mobileNumber").isMobilePhone(ALLOWED_MOBILE_COUNTRIES),
	check("agreeToTerms").exists().isBoolean().isIn([true]),
	check("promotions").optional().isBoolean(),
];

const signupFieldValidationRulesSocial = () => [
	check("email", "Your email is not valid").exists().normalizeEmail(),
	check("residenceAddress", "Your Residence address must be present")
		.exists()
		.isLength({ min: 10 }),
	// check("mobileNumber").isMobilePhone(ALLOWED_MOBILE_COUNTRIES),
	check("mobileNumber").isMobilePhone(ALLOWED_MOBILE_COUNTRIES),
	check("agreeToTerms").exists().isBoolean().isIn([true]),
	check("promotions").optional().isBoolean(),
];

const loginValidationRules = () => [
	check("userId")
		.exists()
		.isLength({ min: 5 })
		.trim()
		.escape()
		.withMessage("Username must have more than 5 characters"),
	check("password", "Your password must be at least 5 characters")
		.exists()
		.isLength({ min: 5 }),
];

// const validate = (req, res, next) => {
// 	//if the user _id is present then next()
// 	if (req.body?.user?._id) {
// 		next();
// 	}

// 	const errors = validationResult(req);
// 	console.log("Fieldvalidator");
// 	if (errors.isEmpty()) {
// 		return next();
// 	}
// 	const extractedErrors = [];
// 	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

// 	return res.status(422).json(errors);
// };

module.exports = {
	signupFieldValidationRulesLocal,
	signupFieldValidationRulesSocial,
	loginValidationRules,
};
