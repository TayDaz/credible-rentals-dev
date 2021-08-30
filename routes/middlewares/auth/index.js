const jwt = require("jsonwebtoken");
const {
	FAILURE,
	INITIATED,
	SMS_OTP,
	EMAIL,
	BLOCKED,
	VERIFIED,
	PENDING,
	SUCCESS,
} = require("../../../constants");
const UserModel = require("../../../db/model/user");

const authJwtSignupMiddleware = async (req, res, next) => {
	const token = req.header("token");

	// console.log("TOKEN", token);

	if (!token) {
		return next();
	} else {
		//user with token ith _id found and returning the details in req.user
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET || "TOP_SECRET",
			async (err, decoded) => {
				if (err) {
					console.log(
						"[middlewares/auth/.js] jwt.verify() ERROR",
						err
					);
					res.status(400).json({
						status: FAILURE,
						message: "Incorrect url",
						data: {
							error: err,
						},
					});
				}

				console.log(
					"[middlewares/auth/.js] authJwtSignupMiddleware decoded ",
					decoded
				);

				//if token was not successsfully decoded
				if (!decoded?.token) {
					console.log(
						"[middlewares/auth/.js] authJwtSignupMiddleware WARNING token invalid decoded ",
						decoded
					);
					return res.status(400).json({
						status: FAILURE,
						message: "Could not verify the user. Please Re-Login.",
					});
				} else {
					let user;
					try {
						user = await UserModel.findById({ _id: decoded.token });
					} catch (err) {
						console.log("[middlewares/auth/.js] ERROR ", err);
						res.status(400).json({
							status: FAILURE,
							message:
								"Could not verify the user. Please Re-Login.",
						});
					}

					if (!user) {
						console.log(
							`[middlewares/auth/.js] authJwtSignupMiddleware WARNING user _id(${decoded.token}) not found`
						);
						return res.status(400).json({
							status: FAILURE,
							message:
								"Could not verify the user. Please Re-Login.",
						});
					} else {
						//saving the user details in the req body
						let userDbDetails = ({
							_id,
							promotions,
							provider,
							accountStatus,
							accountStatusReason,
							smsAuthStatus,
							emailAuthStatus,
							type,
							signupStatus,
							smsVerificationCodeStatus,
							smsVerificationCodeAttemptCounter,
							emailVerificationCodeStatus,
							emailVerificationCodeAttemptCounter,
							firstName,
							lastName,
							username,
							email,
							residenceAddress,
							mobileNumber,
							agreeToTerms,
							createdAt,
							updatedAt,
							smsVerificationCode,
							emailVerificationCode,
						} = user);

						req.user = userDbDetails;
						// console.log("from here");
						// console.log(req.user);
						return next();
					}
				}
			}
		);
	}
};

const authJwtMiddleware = async (req, res, next) => {
	const token = req.header("token");

	// console.log("TOKEN", token);

	if (!token) {
		console.log(
			"[middlewares/auth/.js] authJwtMiddleware > jwt.verify() WARNING no token found in header hence rejecting"
		);
		return res.status(400).json({
			status: FAILURE,
			message: "Incorrect url",
		});
	} else {
		//user with token ith _id found and returning the details in req.user
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET || "TOP_SECRET",
			async (err, decoded) => {
				if (err) {
					console.log(
						"[middlewares/auth/.js] authJwtMiddleware jwt.verify() ERROR",
						err
					);
					return res.status(400).json({
						status: FAILURE,
						message: "Incorrect url",
						data: {
							error: err,
						},
					});
				}

				console.log(
					"[middlewares/auth/.js] authJwtMiddleware decoded ",
					decoded
				);

				//if token was not successsfully decoded
				if (!decoded?.token) {
					console.log(
						"[middlewares/auth/.js] authJwtSignupMiddleware WARNING token invalid decoded ",
						decoded
					);
					return res.status(400).json({
						status: FAILURE,
						message: "Could not verify the user. Please Re-Login.",
					});
				} else {
					// const _id = decoded.token;

					let user;
					try {
						user = await UserModel.findById({ _id: decoded.token });
					} catch (err) {
						console.log("[middlewares/auth/.js] ERROR ", err);
						res.status(400).json({
							status: FAILURE,
							message:
								"Could not verify the user. Please Re-Login.",
						});
					}

					if (!user) {
						console.log(
							`[middlewares/auth/.js] authJwtMiddleware WARNING user _id(${decoded.token}) not found`
						);

						res.redirect(
							"http://localhost:3000/auth?user=SESSION_INVALID"
						);
					} else {
						//checking to see if the user's account is valid or not
						// if (
						// 	[INITIATED, PENDING, VERIFIED].includes(
						// 		user.accountStatus
						// 	) &&
						// 	[INITIATED, SMS_OTP, EMAIL, VERIFIED].includes(
						// 		user.accountStatus
						// 	)
						// ) {
						// if (
						// 	(user.signupStatus === INITIATED &&
						// 		user.accountStatus === PENDING) ||
						// 	(user.signupStatus === VERIFIED &&
						// 		user.accountStatus !== BLOCKED)
						// )
						//saving the user details in the req body
						let userDbDetails = ({
							_id,
							promotions,
							provider,
							accountStatus,
							accountStatusReason,
							smsAuthStatus,
							emailAuthStatus,
							type,
							signupStatus,
							smsVerificationCodeStatus,
							smsVerificationCodeAttemptCounter,
							emailVerificationCodeStatus,
							emailVerificationCodeAttemptCounter,
							firstName,
							lastName,
							username,
							email,
							residenceAddress,
							mobileNumber,
							agreeToTerms,
							createdAt,
							updatedAt,
							smsVerificationCode,
							emailVerificationCode,
							adds,
						} = user);
						req.user = userDbDetails;
						return next();
						//}

						//if accountStatus === BLOCKED
						// res.redirect(
						// 	"http://localhost:3000/auth?user=SESSION_INVALID"
						// );
					}
				}
			}
		);
	}
};

const authJwtPasswordResetMiddleware = async (req, res, next) => {
	const token = req.header("token");

	// console.log("TOKEN", token);

	if (!token) {
		console.log(
			"[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING no token found in header hence moving to controller"
		);
		return next();
	} else {
		//user with token with email found and returning the details in req.user
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET || "TOP_SECRET",
			async (err, decoded) => {
				if (err) {
					console.log(
						"[middlewares/auth/.js] authJwtPasswordResetMiddleware jwt.verify() ERROR",
						err
					);
					return res.status(400).json({
						status: FAILURE,
						message: "Incorrect url",
						data: {
							error: err,
						},
					});
				}

				console.log(
					"[middlewares/auth/.js] authJwtPasswordResetMiddleware decoded ",
					decoded
				);

				//if token was not successsfully decoded
				if (!decoded?.token) {
					console.log(
						"[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING token invalid decoded ",
						decoded
					);
					return res.status(400).json({
						status: FAILURE,
						message: "Could not verify the user. Please retry",
					});
				} else {
					// const _id = decoded.token;

					const user = await UserModel.findOne({
						email: decoded.token,
					}).catch((err) => {
						console.log(
							"[middlewares/auth/.js] authJwtPasswordResetMiddleware ERROR ",
							err
						);
						return res.status(400).json({
							status: FAILURE,
							message:
								"Could not verify the user. Please Re-Login.",
						});
					});

					if (!user) {
						console.log(
							`[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING user email(${decoded.token}) not found`
						);

						return res
							.status(400)
							.json({ status: FAILURE, message: "Invalid data" });
					} else {
						req.user = user;
						return next();
					}
				}
			}
		);
	}
};

const authJwtForgotPasswordMiddleware = async (req, res, next) => {
	const token = req.header("token");

	// console.log("TOKEN", token);

	if (!token) {
		console.log(
			"[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING no token found in header hence moving to controller"
		);
		return next();
	} else {
		//user with token with email found and returning the details in req.user
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET || "TOP_SECRET",
			async (err, decoded) => {
				if (err) {
					console.log(
						"[middlewares/auth/.js] authJwtPasswordResetMiddleware jwt.verify() ERROR",
						err
					);
					return res.status(200).json({
						status: FAILURE,
						message: "Please refresh the page and try again",
					});
				}

				console.log(
					"[middlewares/auth/.js] authJwtPasswordResetMiddleware decoded ",
					decoded
				);

				//if token was not successsfully decoded
				if (!decoded?.token) {
					console.log(
						"[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING token invalid decoded ",
						decoded
					);
					return res.status(200).json({
						status: FAILURE,
						message: "Could not verify the user. Please retry",
					});
				} else {
					// const _id = decoded.token;

					const user = await UserModel.findOne({
						email: decoded.token,
					}).catch((err) => {
						console.log(
							"[middlewares/auth/.js] authJwtPasswordResetMiddleware ERROR ",
							err
						);
						return res.status(200).json({
							status: FAILURE,
							message:
								"Could not verify the user. Please Re-Login.",
						});
					});

					if (!user) {
						console.log(
							`[middlewares/auth/.js] authJwtPasswordResetMiddleware WARNING user email(${decoded.token}) not found`
						);

						return res
							.status(200)
							.json({ status: FAILURE, message: "Invalid data" });
					} else {
						req.user = user;
						return next();
					}
				}
			}
		);
	}
};

const validateFieldSignupMiddleware =
	(validations) => async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);

		console.log("Fieldvalidator");

		//if no errors in the fields
		if (errors.isEmpty()) {
			//pre-signup completion
			if (
				req.user._id &&
				!req.body.firstname &&
				!req.body.lastname &&
				!req.body.password &&
				!req.body.confirmPassword &&
				!req.body.username
			) {
				//continue social signup
				next();
			} else if (!req?.user?._id) {
				//local signup
				next();
			} else {
				res.status(400).json({
					STATUS: FAILURE,
					message: "Incorrect data sent",
				});
			}
		} else {
			res.status(400).json({ errors: errors.array() });
		}
	};

const signupUserFieldMiddleware = async (req, res, next) => {
	//if signupStatus is PENDING then all the fields are not populated and this is for
	//Social type of login
	console.log("signupUserFieldMiddleware", req.user);
	if (req?.user?._id) {
		const user = req.user;
		if (user?.signupStatus === SMS_OTP || user?.signupStatus === EMAIL) {
			return next();
		} else if (user?.signupStatus === INITIATED) {
			//this us  er is completing the signup journey
			//signupStatus INITIATED from PENDING
			console.log("signupstatus is initiated");
			let {
				email,
				residenceAddress,
				mobileNumber,
				agreeToTerms,
				promotions,
			} = req.body;

			// const { _id } = user;
			let updateUserDetails;

			try {
				updateUserDetails = await UserModel.findByIdAndUpdate(
					{ _id: user._id },
					{
						email,
						residenceAddress,
						mobileNumber,
						agreeToTerms,
						promotions,
						signupStatus: SMS_OTP,
					},
					{ new: true }
				);
			} catch (err) {
				console.log(
					"[middlewares/auth/.js] ERROR signupUserFieldMiddleware Could not update User details in the table while signing up",
					err
				);
				return res.status(400).json({
					status: FAILURE,
					message:
						"Could not update User details in the table while signing up",
				});
			}

			if (updateUserDetails) {
				console.log("db details updated");
				let userDbDetails = ({
					promotions,
					provider,
					accountStatus,
					accountStatusReason,
					smsAuthStatus,
					emailAuthStatus,
					type,
					signupStatus,
					smsVerificationCodeStatus,
					emailVerificationCodeStatus,
					firstName,
					lastName,
					username,
					email,
					residenceAddress,
					mobileNumber,
					agreeToTerms,
					createdAt,
					updatedAt,
				} = updateUserDetails);

				// req.user = userDbDetails;
				// next();
				return res
					.status(200)
					.json({ status: SUCCESS, data: updateUserDetails });
			} else {
				console.log(
					"[middlewares/auth/.js] ERROR signupUserFieldMiddleware Could not update User details in the table while signing up"
				);
				return res.status(400).json({
					status: FAILURE,
					message:
						"Could not update User details in the table while signing up",
				});
			}
		}
	} else {
		//local login insert all the fields in the database
		let {
			firstName,
			lastName,
			username,
			email,
			password,
			confirmPassword,
			residenceAddress,
			mobileNumber,
			agreeToTerms,
			promotions,
		} = req.body;

		//Checking if the username or email exists or not
		let isUserExist;
		try {
			isUserExist = await UserModel.find({
				$or: [{ username }, { email }],
			});
		} catch (err) {
			console.log(
				"[middlewares/auth/.js] ERROR signupUserFieldMiddleware User details exists",
				err
			);
			return res.status(400).json({
				status: FAILURE,
				message: "User already exists DB",
			});
		}

		if (isUserExist.length !== 0) {
			console.log(
				"[middlewares/auth/.js] ERROR signupUserFieldMiddleware User details exists"
			);
			// console.log(isUserExist);
			return res.status(400).json({
				status: FAILURE,
				message: "User already exists",
			});
		}

		let user;
		//creating new user
		try {
			user = await UserModel.create({
				firstName,
				lastName,
				username,
				email,
				password,
				confirmPassword,
				residenceAddress,
				mobileNumber,
				agreeToTerms,
				promotions,
				signupStatus: SMS_OTP,
			});
		} catch (err) {
			console.log(
				"[middlewares/auth/.js] ERROR signupUserFieldMiddleware Could not INSERT User details in the table while signing up",
				err
			);
			return res.status(400).json({
				status: FAILURE,
				message:
					"Could not INSERT User details in the table while signing up",
			});
		}

		if (user) {
			const userDetails = extractUserResFromDocument(user);
			console.log("updated user", userDetails);

			// req.user = userDbDetails;
			const token = getJWToken(user._id);
			return res
				.status(200)
				.json({ status: SUCCESS, data: { ...userDetails, token } });
		} else {
			console.log(
				"[middlewares/auth/.js] ERROR signupUserFieldMiddleware Could not update User details in the table while signing up"
			);
			return res.status(400).json({
				status: FAILURE,
				message:
					"Could not update User details in the table while signing up",
			});
		}
	}
};

const getJWToken = (_id) => {
	const user = { _id };
	const token = jwt.sign({ token: user._id }, "TOP_SECRET");

	return token;
};

const extractUserResFromDocument = (doc) => {
	const {
		promotions,
		provider,
		accountStatus,
		accountStatusReason,
		smsAuthStatus,
		emailAuthStatus,
		type,
		signupStatus,
		smsVerificationCodeStatus,
		emailVerificationCodeStatus,
		firstName,
		lastName,
		username,
		email,
		residenceAddress,
		mobileNumber,
		agreeToTerms,
		createdAt,
		updatedAt,
	} = doc;

	return {
		promotions,
		provider,
		accountStatus,
		accountStatusReason,
		smsAuthStatus,
		emailAuthStatus,
		type,
		signupStatus,
		smsVerificationCodeStatus,
		emailVerificationCodeStatus,
		firstName,
		lastName,
		username,
		email,
		residenceAddress,
		mobileNumber,
		agreeToTerms,
		createdAt,
		updatedAt,
	};
};

const signupSmsVerificationMiddleware = async (req, res, next) => {
	const {
		firstName,
		lastName,
		username,
		email,
		password,
		confirmPassword,
		residenceAddress,
		mobileNumber,
		agreeToTerms,
		promotions,
	} = req.body;
};

module.exports = {
	authJwtMiddleware,
	authJwtSignupMiddleware,
	signupUserFieldMiddleware,
	validateFieldSignupMiddleware,
	authJwtPasswordResetMiddleware,
	authJwtForgotPasswordMiddleware,
	signupSmsVerificationMiddleware,
};
