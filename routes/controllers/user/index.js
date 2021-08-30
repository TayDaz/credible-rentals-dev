const express = require("express");
const router = express().Router;
const UserModel = require("../../../db/model/user");
const {
  NOT_INITIATED,
  INITIATED,
  PENDING,
  SMS_OTP,
  EMAIL,
  SUCCESS,
  UPDATE,
  FAILURE,
  INITIATED_EMAIL_OTP,
  INITIATED_SMS_OTP,
} = require("../../../constants");
const TOTP = require("../../../utils/TOTP");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("../../../utils/S3");
// const generateSmsOtp = require("../../../utils/smsOtpGenerator");

const profileController = async (req, res) => {
  console.log("[controllers/user profileRouter req.user]", req.user);
  //get all the details of the user

  // const user = await UserModel.findOne({ _id }).select(
  // 	"-_id firstName lastName provider email accountStatus accountStatusReason type signupStatus mobileNumber residenceAddress"
  // );
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
  } = req.user;

  const userProfile = {
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
    createdAt,
    updatedAt,
  };

  res.status(200).json({ status: SUCCESS, data: userProfile });

  // //check if the user sign up is pending

  // if (
  // 	signupStatus === SMS_OTP &&
  // 	(smsOtpAuthStatus === PENDING || smsOtpAuthStatus === INITIATED)
  // ) {
  // 	const smsOtpCode = "123456",
  // 		mobileNumber = "919035175045";
  // 	const isSmsSent = await generateSmsOtp(
  // 		"Vonage APIs",
  // 		mobileNumber,
  // 		`OTP testing: ${smsOtpCode}`
  // 	);

  // 	if (isSmsSent.status === SUCCESS) {
  // 		console.log("[controllers/auth] signupStatus", signupStatus);
  // 		const updateOtp = await UserModel.findByIdAndUpdate(
  // 			{ _id },
  // 			{
  // 				smsOtpCode,
  // 				smsOtpAuthStatus: INITIATED,
  // 			}
  // 		);
  // 		res.status(200).json({ ...userProfile, isSmsSent: true });
  // 	}
  // } else if (signupStatus === EMAIL) {
  // 	console.log("[controllers/auth] signupStatus", signupStatus);
  // 	// const emailOtpCode = "123456", email = "xaviuscode@gmail.com";
  // 	// const isEmailGenerated = await generateEmail();

  // 	// if(isEmailGenerated.status === "SUCCESS") {
  // 	// 	const updateOtp = await UserModel.findByIdAndUpdate({_id}, {
  // 	// 		smsOtpCode,
  // 	//		verificationType: EMAIL,
  // 	// 		smsOtpAuthStatus: INITIATED
  // 	// 	})
  // 	// }
  // } else {
  // 	if (!user) {
  // 		res.redirect("http://localhost:5000/auth/");
  // 	}

  // 	res.json(userProfile);
  // }
};

const updateNonAuthUserInfoController = async (req, res) => {
  const user = req.user;
  console.log(
    "[controllers/user/.js] updateNonAuthUserInfoController req.body",
    req.body
  );

  const { firstName, lastName, residenceAddress } = req.body;

  const userNonAuthInfo = {};
  for (const [key, value] of Object.entries(req.body)) {
    userNonAuthInfo[key] = value;
  }

  const updateUserInfo = await UserModel.findByIdAndUpdate(
    { _id: user._id },
    userNonAuthInfo,
    { new: true }
  )
    .select("firstName lastName residenceAddress")
    .catch((err) => {
      console.error(
        "[controllers/user/.js] updateNonAuthUserInfoController ERROR while updating the data in db"
      );
      return res.status(200).json({ status: FAILURE, message: "Server Error" });
    });

  if (!updateUserInfo) {
    console.error(
      "[controllers/user/.js] updateNonAuthUserInfoController ERROR no data retured while updating the data in DB"
    );
    return res.status(200).json({ status: FAILURE, message: "Server Error" });
  }

  return res.status(200).json({ status: SUCCESS, data: updateUserInfo });
};

const updateMobileNumberController = async (req, res) => {
  let user = req.user;

  /**
   * if there is no data in req.body then treat it as the beginning of the password update journey
   * hence update the user's passwordChangeStatus to NOT_INITIATED
   */
  let updateMobileNumberChangeStatus;

  if (Object.keys(req.body).length === 0) {
    console.log("keys length ", Object.keys(req.body).length);
    updateMobileNumberChangeStatus = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        mobileNumberChangeStatus: NOT_INITIATED,
      },
      { new: true }
    ).catch((err) => {
      console.error(
        "[controllers/user/.js] updateMobileNumberController ERROR while updating the mobileNumberChangeStatus when no req.body",
        err
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Unexpected Server Error" });
    });

    if (!updateMobileNumberChangeStatus) {
      console.error(
        "[controllers/user/.js] updateMobileNumberController ERROR no data returned while updating the mobileNumberChangeStatus when no req.body"
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Unexpected Server Error" });
    }

    user = updateMobileNumberChangeStatus;
  }

  let otpSms, isSmsSent, challengeCode;

  switch (user.mobileNumberChangeStatus) {
    case NOT_INITIATED:
      // const mobileNumber = req.body.mobileNumber;
      otpSms = TOTP.get();
      //send to the user's email id
      console.log("Sending Email verification code as otp", otpSms);
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
      isSmsSent = true;

      if (!isSmsSent) {
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
          mobileNumberChangeStatus: INITIATED_EMAIL_OTP,
          mobileNumberChangeChallengeCode: otpSms,
        }
      );
      console.log(
        `[controllers/auth/.js] passwordResetController Password Reset Initiated for user(${user._id})`
      );
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          mobileNumberChangeStatus: INITIATED_EMAIL_OTP,
        },
      });
    case INITIATED_EMAIL_OTP:
      challengeCode = req.body.challengeCode;

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

      //verify if the otp is valid

      if (user.mobileNumberChangeChallengeCode !== challengeCode) {
        console.log(
          `[controllers/auth/.js] passwordResetController ERROR chanllengeCode entered was incorrect challenge=${challengeCode}`
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Incorrect OTP. Please try again",
        });
      }

      updateMobileNumberChangeStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          mobileNumberChangeStatus: UPDATE,
          mobileNumberChangeChallengeCode: "",
        }
      );

      if (!updateMobileNumberChangeStatus) {
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
          mobileNumberChangeStatus: UPDATE,
        },
      });

    case UPDATE:
      const newMobileNumber = req.body.mobileNumber;

      if (!newMobileNumber) {
        console.error(
          "[controllers/auth/.js] mobileNumberChangeController ERROR No new mobile number provided in UPDATE case"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "New mobile number missing",
        });
      }

      /**Send the otp to the new mobile number and send the response with newMobileNumber */

      otpSms = TOTP.get();

      isSmsSent = true;

      updateMobileNumberChangeStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          newMobileNumber,
          mobileNumberChangeStatus: INITIATED_SMS_OTP,
          mobileNumberChangeChallengeCode: otpSms,
        }
      ).catch((err) => {
        console.log(
          `[controllers/auth/.js] updateMobileNumberController ERROR while updating the new mobile number and mobileNumberChangeStatus`,
          err
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Server Error",
        });
      });

      if (!updateMobileNumberChangeStatus) {
        console.error(
          "[controllers/auth/.js] mobileNumberChangeController ERROR No data returned after adding new mobile number and updating status in UPDATE case"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "New mobile number missing",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: {
          newMobileNumber,
          mobileNumberChangeStatus: INITIATED_SMS_OTP,
        },
      });

    case INITIATED_SMS_OTP:
      challengeCode = req.body.challengeCode;

      //if challengeCode is not present then send error response
      if (!challengeCode) {
        //send error response
        console.log(
          "[controllers/auth/.js] updateMobileNumberController ERROR chanllengeCode was not present"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "OTP code was missing",
        });
      }

      //verify if the otp is valid

      if (user.mobileNumberChangeChallengeCode !== challengeCode) {
        console.log(
          `[controllers/auth/.js] passwordResetController ERROR chanllengeCode entered was incorrect challenge=${challengeCode}`
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Incorrect OTP. Please try again",
        });
      }

      updateMobileNumberChangeStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          mobileNumber: user.newMobileNumber,
          mobileNumberChangeStatus: NOT_INITIATED,
          mobileNumberChangeChallengeCode: "",
          newMobileNumber: "",
        },
        { new: true }
      ).catch((err) => {
        console.log(
          "[controllers/auth/.js] updateMobileNumberController ERROR while updating the mobileNumberChangeStatus and mobileNumber in DB"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Server Error",
        });
      });

      if (!updateMobileNumberChangeStatus) {
        console.log(
          "[controllers/auth/.js] passwordResetController ERROR no data returned while updating the mobileNumberChangeStatus and mobileNumber in DB"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: {
          mobileNumberChangeStatus: SUCCESS,
          mobileNumber: updateMobileNumberChangeStatus.mobileNumber,
        },
      });
  }
};

const updateResidenceAddressController = async (req, res) => {};

const updatePasswordController = async (req, res) => {
  let user = req.user;
  console.log(
    "[controllers/user/.js] updatePasswordController req.body",
    req.body
  );

  /**
   * if there is no data in req.body then treat it as the beginning of the password update journey
   * hence update the user's passwordChangeStatus to NOT_INITIATED
   */
  let updatePasswordChangeStatus;

  if (Object.keys(req.body).length === 0) {
    console.log("keys length ", Object.keys(req.body).length);
    updatePasswordChangeStatus = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        passwordChangeStatus: NOT_INITIATED,
      },
      { new: true }
    ).catch((err) => {
      console.error(
        "[controllers/user/.js] updatePasswordController ERROR while updating the passwordResetStatus when no req.body",
        err
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Unexpected Server Error" });
    });

    if (!updatePasswordChangeStatus) {
      console.error(
        "[controllers/user/.js] updatePasswordController ERROR no data returned while updating the passwordResetStatus when no req.body"
      );
      return res
        .status(200)
        .json({ status: FAILURE, message: "Unexpected Server Error" });
    }

    user = updatePasswordChangeStatus;
  }

  // console.log("user", user);

  /**
   * Switch case for passwordChangeStatus
   */
  switch (user.passwordChangeStatus) {
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
          "[controllers/auth/.js] updatePasswordController ERROR while sending email"
        );
        return res.status(500).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      //if email with otp is sent then update the database and send the response
      updatePasswordChangeStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          passwordChangeStatus: INITIATED,
          passwordChangeChallengeCode: otpEmail,
        }
      ).catch((err) => {
        console.error(
          "[controllers/user/.js] updatePasswordController ERROR while updating the passwordResetStatus to INITIATED",
          err
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Unexpected Server Error",
        });
      });

      if (!updatePasswordChangeStatus) {
        console.error(
          "[controllers/user/.js] updatePasswordController ERROR no data returned while updating the passwordResetStatus to INITIATE"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Unexpected Server Error",
        });
      }
      console.log(
        `[controllers/auth/.js] passwordResetController Password Reset Initiated for user(${user._id})`
      );

      return res.status(200).json({
        status: "SUCCESS",
        data: { passwordChangeStatus: INITIATED },
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

      //verify if the otp is valid

      if (user.passwordChangeChallengeCode !== challengeCode) {
        console.log(
          `[controllers/auth/.js] passwordResetController ERROR chanllengeCode entered was incorrect challenge=${challengeCode}`
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Incorrect challenge code",
        });
      }

      updatePasswordChangeStatus = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          passwordChangeStatus: UPDATE,
          passwordChangeChallengeCode: "",
        },
        { new: true }
      ).catch((err) => {
        console.error(
          "[controllers/user/.js] updatePasswordController ERROR while updating the passwordResetStatus to INITIATED",
          err
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Unexpected Server Error",
        });
      });

      if (!updatePasswordChangeStatus) {
        console.log(
          "[controllers/auth/.js] updatePasswordController ERROR while updating the passwordResetStatus in DB"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Server Error",
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: {
          passwordChangeStatus: UPDATE,
        },
      });

    case UPDATE:
      let oldPassword = req.body.oldPassword,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword;

      //verify the old password matches the current password and
      // the new password === confirm password

      //if newPassword is not present then send error response
      if (!password) {
        //send error response
        console.log(
          "[controllers/user/.js] updatePasswordController ERROR password was not present"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Password was missing",
        });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        console.log(
          "[controllers/user/.js] updatePasswordController ERROR Old password is incorrect"
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Incorrect old password provided",
        });
      }
      if (password !== confirmPassword) {
        console.log(
          "[controllers/user/.js] updatePasswordController ERROR new passwords are NOT same"
        );
        return res.status(400).json({
          status: FAILURE,
          message: "New Passwords do not match",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updateUserPassword = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        {
          password: hashedPassword,
          passwordChangeStatus: NOT_INITIATED,
        }
      ).catch((err) => {
        console.error(
          "[controllers/user/.js] updatePasswordController ERROR while updating the new passwords",
          err
        );
        return res.status(200).json({
          status: FAILURE,
          message: "Unexpected Server Error",
        });
      });

      if (!updateUserPassword) {
        console.log(
          "[controllers/auth/.js] updatePasswordController ERROR no data returned while updating password in DB"
        );
        return res.status(200).json({
          status: FAILURE,
        });
      }

      return res.status(200).json({
        status: SUCCESS,
        data: { passwordChangeStatus: SUCCESS },
      });
  }
};

const updateAvatarController = async (req, res) => {
  console.log("[controllers/user/.js] updateAvatarController");
  const user = req.user;
  const file = req.file;
  const files = req.files;
  console.log(file);
  // console.log(files);

  // apply filter
  // resize

  const result = await uploadFile(file);

  if (!result) {
    console.log(
      "[controllers/user/.js] updateAvatarController ERROR during file upload"
    );
    return res
      .status(500)
      .json({ status: FAILURE, message: "Server Error occurred" });
  }

  const updateAvatar = await UserModel.findByIdAndUpdate(
    { _id: user._id },
    { avatar: result.key }
  ).catch((err) => {
    console.log(
      "[controllers/user/.js] updateAvatarController ERROR during updating the Avatar in DB ",
      err
    );
    return res
      .status(500)
      .json({ status: FAILURE, message: "Server Error occurred" });
  });

  if (!updateAvatar) {
    console.log(
      "[controllers/user/.js] updateAvatarController ERROR user id found but avatar not updated"
    );
    return res
      .status(500)
      .json({ status: FAILURE, message: "Server Error occurred" });
  }
  // await unlinkFile(file.path)
  // console.log(result)
  // const description = req.body.description
  return res.status(200).json({
    status: SUCCESS,
    data: { avatar: result.key },
    message: "New avatar received",
  });
};

const uploadAddController = async (req, res) => {
  console.log(
    "[controllers/user/.js] uploadAddController req.files",
    req.files
  );
  console.log("[controllers/user/.js] uploadAddController req.body", req.body);
  return res
    .status(200)
    .json({ status: SUCCESS, message: "Add saved successfully" });
};

module.exports = {
  profileController,
  updateNonAuthUserInfoController,
  updatePasswordController,
  updateMobileNumberController,
  updateResidenceAddressController,
  updateAvatarController,
  uploadAddController,
};
