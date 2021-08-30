const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
	const token = req.body.token;

	console.log("TOKEN", token);

	jwt.verify(
		token,
		process.env.JWT_TOKEN_SECRET || "TOP_SECRET",
		(err, decoded) => {
			if (err) {
				console.log("DECODED_ERROR", err);
				next();
			}
			console.log("DECODED", decoded);
			next();
		}
	);
};

module.exports = jwtValidator;
