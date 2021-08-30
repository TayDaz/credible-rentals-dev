const passport = require("passport");
const jwt = require("jsonwebtoken");
const SMS = require("../../../utils/SMS");
const TOTP = require("../../../utils/TOTP");
const Email = require("../../../utils/Email");
const UserModel = require("../../../db/model/user");
const bcrypt = require("bcrypt");
const {
  SMS_OTP,
  INITIATED,
  SUCCESS,
  PENDING,
  FAILURE,
  RESEND,
  SENT,
  VERIFIED,
  EMAIL,
  BLOCKED,
  VALID,
  USED,
  LOCAL,
  NOT_INITIATED,
  UPDATE,
} = require("../../../constants");

const { FORGOT_PASSWORD_COUNTER_LIMIT } = require("../../../config");

const signupController = async (req, res) => {
  // return res
  // 	.status(200)
  // 	.json({ status: INITIATED, message: "Hi from signupcontroller" });

  const user = req.user;
  console.log("signupController USER ID ====================", req.user);
  // console.log("USER ID ====================", req.user._id);

  switch (user.signupStatus) {
    case SMS_OTP:
      switch (user.smsAuthStatus) {
        case PENDING:
          //get otp
          const otp = TOTP.get();
          const smsProps = {
            from: process.env.VONAGE_BRAND_NAME || "Vonage APIs",
            to: `+${user.mobileNumber}` || "+919035175045",
            text: `SMS OTP - ${otp}`,
          };
          //send sms
          // const isSmsSent = await SMS.send(
          // 	smsProps.to,
          // 	smsProps.text
          // );
          const isSmsSent = true;
          console.log("Sending sms verification code as otp", otp);
          if (isSmsSent) {
            let isSmsOtpCodeUpdated;
            try {
              isSmsOtpCodeUpdated = await UserModel.findByIdAndUpdate(
                { _id: user._id },
                {
                  smsAuthStatus: INITIATED,
                  smsVerificationCode: otp,
                  smsVerificationCodeStatus: SENT,
                  smsVerificationCodeAttemptCounter: 1,
                },
                { new: true }
              ).select(
                "-_id -password -smsVerificationCodeAttemptCounter -emailVerificationCodeAttemptCounter -createdAt -updatedAt -smsVerificationCode -__v"
              );
            } catch (err) {
              console.log(
                "[controllers/auth/.js] signupSmsOtpController ERROR while trying to upda the sms otp code to db",
                err
              );

              return res.status(500).json({
                status: FAILURE,
              });
            }

            if (!isSmsOtpCodeUpdated) {
              return res.status(500).json({
                status: FAILURE,
              });
            }

            if (user.provider === LOCAL) {
              const token = getJWToken(user._id);

              const userResData =
                extractUserResFromDocument(isSmsOtpCodeUpdated);

              return res.status(200).json({
                status: SUCCESS,
                data: { ...userResData, token },
              });
            }

            return res.status(200).json({
              status: SUCCESS,
              data: isSmsOtpCodeUpdated,
            });
          } else {
            return res.status(500).json({
              status: FAILURE,
            });
          }

        case INITIATED:
          const { otpCode } = req.body;

          if (!otpCode) {
            console.log(
              "[controllers/auth/.js] signupSmsOtpController ERROR otpCode missing in req.body for INITIATED"
            );
            return res.status(200).json({
              status: FAILURE,
              message: "User not authorised to perform this action",
            });
          }

          const isOtpVerified = TOTP.verify(otpCode);

          console.log("OTP CODE verify", isOtpVerified);
          // if (!isOtpVerified) {
          // 	console.log(
          // 		`[contorllers/auth/.js] signupSmsOtpController ERROR SMS_OTP is validated but not SAME`,
          // 		isOtpVerified
          // 	);
          // 	return res.status(400).json({
          // 		status: FAILURE,
          // 		code: "RESP_MSG_5_FAILURE",
          // 	});
          // }

          if (otpCode == user.smsVerificationCode) {
            let isSmsVerificationStatusUpdated;
            try {
              isSmsVerificationStatusUpdated =
                await UserModel.findByIdAndUpdate(
                  { _id },
                  {
                    signupStatus: EMAIL,
                    smsAuthStatus: VERIFIED,
                    smsVerificationCodeStatus: USED,
                    smsVerificationCodeAttemptCounter: 0,
                  },
                  { new: true }
                ).select(
                  "signupStatus smsAuthStatus smsVerificationCodeStatus"
                );
            } catch (err) {
              res.status(400).json({
                status: FAILURE,
                code: "RESP_MSG_6_FAILURE",
                message: "Incorrect OTP code. Please try again",
              });
              console.log(err);
            }
            if (!isSmsVerificationStatusUpdated) {
              console.log(
                `[contorllers/auth/.js] signupSmsOtpController ERROR SMS_OTP is validated but not SAME`
              );
              return res.status(200).json({
                status: FAILURE,
                code: "RESP_MSG_5_FAILURE",
                message: "Server error",
              });
            }

            // if (user.provider === LOCAL) {
            const token = getJWToken(user._id);

            const userResData = extractUserResFromDocument(
              isSmsVerificationStatusUpdated
            );

            // setTimeout(() => {
            // 	return res.status(200).json({
            // 		status: SUCCESS,
            // 		data: { ...userResData, token },
            // 	});
            // }, 10000);

            return res.status(200).json({
              status: SUCCESS,
              data: { ...userResData, token },
            });

            // return res.status(200).json({
            // 	status: SUCCESS,
            // 	data: isSmsVerificationStatusUpdated,
            // });
          } else {
            //increasing the smsOtpAttemptCounter
            // console.log(
            // 	"[controllers/auth/.js] signupSmsOtpController SWITCHED as although it verified the otp code was not present in the database"
            // );
            try {
              const isAttemptCounterInc = await UserModel.findByIdAndUpdate(
                { _id },
                {
                  smsVerificationCodeAttemptCounter:
                    user.smsVerificationCodeAttemptCounter + 1,
                }
              ).select("signupStatus smsAuthStatus smsVerificationCodeStatus");
            } catch (err) {
              console.log(
                "[controllers/auth/.js] signupSmsOtpController ERROR while trying to update the smsVerificationCodeAttemptCounter due to incorrect attempt"
              );
              return res.status(200).json({
                status: FAILURE,
                message: "Incorrect OTP code. Please try again",
              });
            }

            console.log(
              `[contorllers/auth/.js] signupSmsOtpController ERROR SMS_OTP is validated but not SAME`
            );

            return res.status(200).json({
              status: FAILURE,
              code: "RESP_MSG_6_FAILURE",
              message: "Incorrect OTP code. Please try again",
            });
          }
      } //switch (user.smsAuthStatus)//SMS_OTP
    case EMAIL:
      switch (user.emailAuthStatus) {
        case PENDING:
          //get otp
          const otpEmail = TOTP.get();

          // const isEmailSent = await Email.send(
          // 	"xaviuscode@gmail.com",
          // 	user.email || "saptarshi027@gmail.com",
          // 	"Credible Rentals Email Verification",
          // 	`Email OTP - ${otpEmail}`
          // );
          const isEmailSent = true;
          console.log("Sending Email verification code as otp", otpEmail);

          if (isEmailSent) {
            let isEmailOtpCodeUpdated;

            try {
              isEmailOtpCodeUpdated = await UserModel.findByIdAndUpdate(
                { _id: user._id },
                {
                  smsAuthStatus: VERIFIED,
                  emailAuthStatus: INITIATED,
                  emailVerificationCode: otpEmail,
                  emailVerificationCodeStatus: SENT,
                  emailVerificationCodeAttemptCounter: 1,
                },
                { new: true }
              ).select(
                "-_id -password -smsVerificationCodeAttemptCounter -emailVerificationCodeAttemptCounter -createdAt -updatedAt -smsVerificationCode -__v"
              );
            } catch (err) {
              console.log(
                "[controllers/auth/.js] signupSmsOtpController ERROR while trying to upda the sms otp code to db",
                err
              );

              return res.status(500).json({
                status: FAILURE,
              });
            }

            if (!isEmailOtpCodeUpdated) {
              return res.status(500).json({
                status: FAILURE,
              });
            }

            if (user.provider === LOCAL) {
              const token = getJWToken(user._id);

              const userResData = extractUserResFromDocument(
                isEmailOtpCodeUpdated
              );

              return res.status(200).json({
                status: SUCCESS,
                data: { ...userResData, token },
              });
            }

            return res.status(200).json({
              status: SUCCESS,
              data: isEmailOtpCodeUpdated,
            });
          } else {
            return res.status(500).json({
              status: FAILURE,
            });
          }

        case INITIATED:
          const { otpCode } = req.body;

          if (!otpCode) {
            console.log(
              "[controllers/auth/.js] signupemailOtpController ERROR otpCode missing in req.body for INITIATED"
            );
            return res.status(200).json({
              status: FAILURE,
              message: "User not authorised to perform this action",
            });
          }

          const isOtpVerified = TOTP.verify(otpCode);

          console.log("OTP CODE verify", isOtpVerified);
          // if (!isOtpVerified) {
          // 	console.log(
          // 		`[contorllers/auth/.js] signupemailOtpController ERROR SMS_OTP is validated but not SAME`,
          // 		isOtpVerified
          // 	);
          // 	return res.status(400).json({
          // 		status: FAILURE,
          // 		code: "RESP_MSG_5_FAILURE",
          // 	});
          // }

          if (otpCode == user.emailVerificationCode) {
            let isemailVerificationStatusUpdated;
            try {
              isemailVerificationStatusUpdated =
                await UserModel.findByIdAndUpdate(
                  { _id },
                  {
                    signupStatus: VERIFIED,
                    emailAuthStatus: VERIFIED,
                    emailVerificationCodeStatus: USED,
                    emailVerificationCodeAttemptCounter: 0,
                  },
                  { new: true }
                ).select("signupStatus smsAuthStatus emailAuthStatus");
            } catch (err) {
              console.log(
                "[contorllers/auth/.js] isemailVerificationStatusUpdated ERROR",
                err
              );
              return res.status(400).json({
                status: FAILURE,
                code: "RESP_MSG_6_FAILURE",
              });
            }
            if (!isemailVerificationStatusUpdated) {
              console.log(
                `[contorllers/auth/.js] signupemailOtpController ERROR email_OTP is validated but not SAME`
              );
              return res.status(400).json({
                status: FAILURE,
                code: "RESP_MSG_5_FAILURE",
              });
            }

            if (user.provider === LOCAL) {
              const token = getJWToken(user._id);

              const userResData = extractUserResFromDocument(
                isemailVerificationStatusUpdated
              );

              return res.status(200).json({
                status: SUCCESS,
                data: { ...userResData },
              });
            }

            return res.status(200).json({
              status: SUCCESS,
              data: isemailVerificationStatusUpdated,
            });
          } else {
            //increasing the emailOtpAttemptCounter
            // console.log(
            // 	"[controllers/auth/.js] signupemailOtpController SWITCHED as although it verified the otp code was not present in the database"
            // );
            try {
              const isAttemptCounterInc = await UserModel.findByIdAndUpdate(
                { _id },
                {
                  emailVerificationCodeAttemptCounter:
                    user.emailVerificationCodeAttemptCounter + 1,
                }
              ).select(
                "signupStatus emailAuthStatus emailVerificationCodeStatus"
              );
            } catch (err) {
              console.log(
                "[controllers/auth/.js] signupemailOtpController ERROR while trying to update the smsVerificationCodeAttemptCounter due to incorrect attempt"
              );
              return res.status(200).json({
                status: FAILURE,
                message: "Incorrect OTP code. Please try again",
              });
            }

            console.log(
              `[contorllers/auth/.js] signupSmsOtpController ERROR SMS_OTP is validated but not SAME`
            );

            return res.status(200).json({
              status: FAILURE,
              code: "RESP_MSG_6_FAILURE",
              message: "Incorrect OTP code. Please try again",
            });
          }
      } //switch (user.smsAuthStatus)//SMS_OTP
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await UserModel.find({
      $or: [{ username }, { email: username }],
    });
  } catch (err) {
    console.log(
      "[controllers/auth/.js] ERROR loginController while tryimg to fetch data from DB",
      err
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Incorrect credentials" });
  }

  console.log("[controllers/auth/.js] INFO loginController user", user);
  if (user.length === 0) {
    console.log(
      "[controllers/auth/.js] ERROR loginController no matching user found"
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Incorrect credentials" });
  }

  user = user[0];

  const { _id } = user;

  // console.log(
  //   "[controllers/auth/.js] password, user.password",
  //   password,
  //   user.password
  // );

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    if (user.accountStatus === PENDING) {
      try {
        user = await UserModel.findByIdAndUpdate(
          { _id },
          { accountStatus: VALID },
          { new: true }
        );
      } catch (err) {
        console.log(
          "[controllers/auth/.js] ERROR loginController while trying to fetch data from DB",
          err
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Incorrect credentials",
        });
      }
    }
    // else check also for the BLOCKED and BLACKLISTED accounts
    const token = getJWToken(_id);

    const userResData = extractUserResFromDocument(user);

    // console.log("[controllers/auth/.js] INFO userResData", userResData, user);

    return res.status(200).json({
      status: SUCCESS,
      data: { ...userResData, token },
    });
  } else {
    console.log(
      "[controllers/auth/.js] ERROR loginController Passwords did not match"
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Incorrect credentials" });
  }
};

const getJWToken = (_id) => {
  const user = { _id };
  const token = jwt.sign({ token: user._id }, "TOP_SECRET");

  return token;
};

const extractUserResFromDocument = (doc) => {
  const {
    _id,
    avatar,
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
    passwordChangeStatus,
    mobileNumberChangeStatus,
    cart,
    wishlist,
  } = doc;

  return {
    _id,
    avatar,
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
    cart,
    wishlist,
    createdAt,
    updatedAt,
  };
};

const facebookController = async (req, res) => {
  // Successful authentication, redirect home.
  // console.log(res);
  // const user = req.user;

  // if(user.email)
  // console.log("req.user", req.user);

  let user = req.user;

  if (user.signupStatus === VERIFIED && user.accountStatus === PENDING) {
    let updatedUser;
    try {
      updatedUser = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        { accountStatus: VALID },
        { new: true }
      );
    } catch (err) {
      console.log(
        "[controllers/auth/.js] ERROR facebookController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    }
    if (!updatedUser) {
      console.log(
        "[controllers/auth/.js] ERROR facebookController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    }
  }

  user = { _id: req.user._id };
  const token = jwt.sign({ token: user._id }, "TOP_SECRET");
  res.redirect(`http://localhost:3000/auth?token=${token}`);
};

const googleController = async (req, res) => {
  // Successful authentication, redirect home.
  // console.log(res);
  // const user = req.user;

  // if(user.email)
  // console.log("req.user", req.user);

  let user = req.user;

  if (user.signupStatus === VERIFIED && user.accountStatus === PENDING) {
    let updatedUser;

    updatedUser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { accountStatus: VALID },
      { new: true }
    ).catch((err) => {
      console.log(
        "[controllers/auth/.js] ERROR googleController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    });

    if (!updatedUser) {
      console.log(
        "[controllers/auth/.js] ERROR facebookController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    }
  }

  user = { _id: req.user._id };
  const token = jwt.sign({ token: user._id }, "TOP_SECRET");
  // res.redirect(`http://localhost:3000/auth?token=${token}`);
  res.redirect(`http://localhost:3000/login?token=${token}`);
};

const twitterController = async (req, res) => {
  // Successful authentication, redirect home.
  // console.log(res);
  // const user = req.user;

  // if(user.email)
  // console.log("req.user", req.user);

  let user = req.user;

  if (user.signupStatus === VERIFIED && user.accountStatus === PENDING) {
    let updatedUser;

    updatedUser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { accountStatus: VALID },
      { new: true }
    ).catch((err) => {
      console.log(
        "[controllers/auth/.js] ERROR googleController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    });

    if (!updatedUser) {
      console.log(
        "[controllers/auth/.js] ERROR facebookController while trying to update the user account status"
      );
      return res.status(500).json({
        status: FAILURE,
        message: "Could not update user details",
      });
    }
  }

  user = { _id: req.user._id };
  const token = jwt.sign({ token: user._id }, "TOP_SECRET");
  res.redirect(`http://localhost:3000/auth?token=${token}`);
};

const passwordResetController = async (req, res) => {
  const email = req.body.email;
  let user;
  if (!req?.user && email) {
    user = await UserModel.findOne({ email }).catch((err) => {
      console.error(
        "[controllers/auth/.js] passwordResetController ERROR while searching for username or email",
        err
      );
      return res.status(400).json({
        status: "FAILURE",
        message: "Server error",
      });
    });
    // user = await UserModel.findOne({
    // 	$or: [{ username }, { email: username }],
    // }).catch((err) => {
    // 	console.log(
    // 		"[controllers/auth/.js] passwordResetController ERROR while searching for username or email"
    // 	);
    // 	return res.status(400).json({
    // 		status: "FAILURE",
    // 		message: "Server error",
    // 	});
    // });
  } else if (req?.user) {
    user = req.user;
  }

  if (!user) {
    console.log(
      "[controllers/auth/.js] passwordResetController Userid or email not found"
    );
    return res.status(400).json({
      status: "FAILURE",
      message: "The userid or email was not found",
    });
  }

  if (user.provider !== LOCAL) {
    console.error(
      `[controllers/auth/.js] passwordResetController ERROR user tried to reset password for ${user.provider} type accounts`
    );
    return res.status(400).json({
      status: FAILURE,
      message:
        "Password reset can not be performed for accounts linked with Facebook, Google or Twitter",
    });
  }

  switch (user.passwordResetStatus) {
    case NOT_INITIATED:
      const otpEmail = TOTP.get();
      //send to the user's email id
      console.log("Sending Email verification code as otp", otpEmail);
      // const isEmailSent = await Email.send(
      // 	"xaviuscode@gmail.com",
      // 	user.email || "saptarshi027@gmail.com",
      // 	"Credible Rentals Password Reset",
      // 	`Email OTP - ${otpEmail}`
      // ).catch((err) => {
      // 	console.log(
      // 		"[controllers/auth/.js] passwordResetController ERROR while sending email"
      // 	);
      // 	return res.status(500).json({
      // 		status: FAILURE,
      // 		message: "Server Error",
      // 	});
      // });
      const isEmailSent = true;

      if (!isEmailSent) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while sending email"
        );
        return res.status(500).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      //if email with otp is sent then update the database and send the response
      const updateUserStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          passwordResetStatus: INITIATED,
          passwordResetChallengeCode: otpEmail,
        }
      );
      console.log(
        `[controllers/auth/.js] passwordResetController Password Reset Initiated for user(${user._id})`
      );
      //get the token with email
      // user = { _id: req.user._id };
      const token = jwt.sign({ token: email }, "TOP_SECRET");
      return res.status(200).json({
        status: "SUCCESS",
        data: { token },
      });
    case INITIATED:
      const challengeCode = req.body.challengeCode;

      //if challengeCode is not present then send error response
      if (!challengeCode) {
        //send error response
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR chanllengeCode was not present"
        );
        return res.status(400).json({
          status: FAILURE,
          message: "OTP code was missing",
        });
      }

      if (user.passwordResetChallengeCode !== challengeCode) {
        console.log(
          `[controllers/auth/.js] passwordResetController ERROR chanllengeCode entered was incorrect challenge=${challengeCode}`
        );
        return res.status(500).json({
          status: FAILURE,
        });
      }

      const updatePasswordResetStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        { passwordResetStatus: UPDATE }
      );

      if (!updatePasswordResetStatus) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while updating the passwordResetStatus in DB"
        );
        return res.status(500).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
      });

    case UPDATE:
      let password = req.body.password,
        confirmPassword = req.body.confirmPassword;

      //if challengeCode is not present then send error response
      if (!password) {
        //send error response
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR password was not present"
        );
        return res.status(400).json({
          status: FAILURE,
          message: "Password was missing",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      password = hash;
      const updateUserPassword = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          password,
          passwordResetStatus: NOT_INITIATED,
          passwordResetChallengeCode: "",
        }
      );

      if (!updateUserPassword) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while updating password in DB"
        );
        return res.status(500).json({
          status: FAILURE,
        });
      }

      return res.status(200).json({
        status: SUCCESS,
      });
  }
};

const forgotPasswordController = async (req, res) => {
  let user;

  if (req.user) {
    user = req.user;
  } else {
    /**
     * find the user by their email id
     */
    const email = req.body.email;

    user = await UserModel.findOne({ email }).catch((err) => {
      console.log(
        "[controllers/auth/.js] forgotPasswordController ERROR while finding the user with email with body",
        err
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Authentication error" });
    });

    if (!user) {
      console.log(
        "[controllers/auth/.js] forgotPasswordController ERROR while finding the user with email with body"
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Authentication error" });
    }
  }

  /**
   * if the user's provider is not local then forgotpassword will not continue
   * and send an error response
   */
  if (user.provider !== LOCAL) {
    console.log(
      `[controllers/auth/.js] forgotPasswordController WARNING userid(${user._id}) with ${user.provider} tried to change the password`
    );
    return res.status(200).json({
      status: FAILURE,
      message: "This account's password cannot be reset",
    });
  }

  /**if the user had already initiated the forgotPassword earlier and then retrying after the previous session was
   * terminated then the forgotPasswordStatus should be reset but the counter should be increased to maintain security
   *
   */
  if (req.body.email && user.forgotPasswordStatus !== NOT_INITIATED) {
    user = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        forgotPasswordStatus: NOT_INITIATED,
      },
      { new: true }
    ).catch((err) => {
      console.log(
        `[controllers/auth/.js] ERROR while updating the forgotPasswordStatus to NOT_INITIATED for userif(${user._id})`,
        err
      );

      return res.status(200).json({ status: FAILURE, message: "Server error" });
    });

    if (!user) {
      console.log(
        "[controllers/auth/.js] ERROR user data not returned while updating the forgotPasswordStatus and forgotPasswordCounter"
      );
      return res.status(200).json({ status: FAILURE, message: "Server error" });
    }
  }

  /**if the user is LOCAL and the forgot password counter has not been reached
   * then the next steps will continue */

  let updateForgotPassword;
  switch (user.forgotPasswordStatus) {
    case NOT_INITIATED:
      /**Cheching if the forgot password limit has been reached
       * if it has then send the appropriate response
       */
      if (user.forgotPasswordCounter === FORGOT_PASSWORD_COUNTER_LIMIT) {
        console.log(
          `[controllers/auth/.js] WARNING userid(${user._id}) forgotPasswordCounter reached limit and hence rejecting`
        );
        return res.status(200).json({
          status: FAILURE,
          message: "This account's Forgot Password limit has been reached",
        });
      }

      /**
       * in this case we fetch the otp, then send it through mail and once confirmed we then update the database
       * to move the forgotPassword status to INITIATED and increase the forgotPasswordCounter
       */

      const otpEmail = TOTP.get();
      //send to the user's email id
      console.log(
        `[controllers/auth/.js] INFO Sending Email OTP verification code(${otpEmail})`
      );
      // const isEmailSent = await Email.send(
      // 	"xaviuscode@gmail.com",
      // 	user.email || "saptarshi027@gmail.com",
      // 	"Credible Rentals Password Reset",
      // 	`Email OTP - ${otpEmail}`
      // ).catch((err) => {
      // 	console.log(
      // 		"[controllers/auth/.js] passwordResetController ERROR while sending email"
      // 	);
      // 	return res.status(500).json({
      // 		status: FAILURE,
      // 		message: "Server Error",
      // 	});
      // });
      const isEmailSent = true;

      if (!isEmailSent) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while sending email"
        );
        return res.status(200).json({
          status: FAILURE,
          message:
            "There has been a problem while sending the OTP through email",
        });
      }

      /**
       * if email with otp is sent then update the database and send the response
       */
      updateForgotPassword = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          forgotPasswordStatus: INITIATED,
          forgotPasswordChallengeCode: otpEmail,
          forgotPasswordCounter: user.forgotPasswordCounter + 1,
        },
        { new: true }
      ).catch((err) => {
        console.log(
          `[controllers/auth/.js] forgotPasswordController ERROR while updating the forgotPasswordStatus for user(${user._id})`,
          err
        );
        return res
          .status(200)
          .json({ status: FAILURE, message: "Server error" });
      });

      console.log(
        `[controllers/auth/.js] passwordResetController INITIATED Forgot Password Initiated for user(${user._id})`
      );

      const token = jwt.sign({ token: user.email }, "TOP_SECRET");

      /**
       * send the response to the user and also check if the forgotPasswordCounter is LIMIT-1
       */
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          forgotPasswordStatus: updateForgotPassword.forgotPasswordStatus,
          isFinalAttempt:
            updateForgotPassword.forgotPasswordCounter ===
            FORGOT_PASSWORD_COUNTER_LIMIT - 1,
          token,
        },
      });

    case INITIATED:
      const challengeCode = req.body.challengeCode;

      //if challengeCode is not present then send error response
      if (!challengeCode) {
        //send error response
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR chanllengeCode was not present"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "OTP code was missing",
        });
      }

      if (user.forgotPasswordChallengeCode !== challengeCode) {
        console.log(
          `[controllers/auth/.js] passwordResetController ERROR chanllengeCode entered was incorrect challenge=${challengeCode}`
        );
        return res.status(500).json({
          status: FAILURE,
          message: "Incorrect OTP. Please try again.",
        });
      }

      updateForgotPassword = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        { forgotPasswordStatus: UPDATE },
        { new: true }
      ).catch((err) => {
        console.log(
          `[controllers/auth/.js] forgotPasswordController ERROR while updating the forgotPasswordStatus for userID(${user._id})`,
          err
        );
        return res
          .status(200)
          .json({ status: FAILURE, message: "Server Error" });
      });

      if (!updateForgotPassword) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while updating the passwordResetStatus in DB"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: {
          forgotPasswordStatus: updateForgotPassword.forgotPasswordStatus,
        },
      });

    case UPDATE:
      let password = req.body.password,
        confirmPassword = req.body.confirmPassword;

      //if challengeCode is not present then send error response
      if (!password && password !== confirmPassword) {
        //send error response
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR passwords do not match"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Passwords do not match",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      password = hash;
      const updateUserPassword = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          password,
          forgotPasswordStatus: NOT_INITIATED,
          forgotPasswordChallengeCode: "",
          forgotPasswordCounter: 0,
        }
      ).catch((err) => {
        console.log(
          `[controllers/auth/.js] forgotPasswordController ERROR while updating the password for userid(${user._id})`,
          err
        );
        return res
          .status(200)
          .json({ status: FAILURE, message: "Server Error" });
      });

      if (!updateUserPassword) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR while updating password in DB"
        );
        return res.status(500).json({
          status: FAILURE,
          message: "Server error",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: {
          forgotPasswordStatus: VERIFIED,
        },
      });
  }
};

module.exports = {
  loginController,
  signupController,
  facebookController,
  googleController,
  twitterController,
  passwordResetController,
  forgotPasswordController,
};
