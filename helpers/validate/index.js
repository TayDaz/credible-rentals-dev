const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
	return [
		[
			check("name")
				.not()
				.isEmpty()
				.withMessage("Name must have more than 5 characters"),
			check("classYear", "Class Year should be a number").not().isEmpty(),
			check("weekday", "Choose a weekday").optional(),
			check("email", "Your email is not valid").not().isEmpty(),
			check("password", "Your password must be at least 5 characters")
				.not()
				.isEmpty(),
		],
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	userValidationRules,
	validate,
};
