const UserModel = require("../../../../db/model/user");

const smsOtpController = async (req, res) => {
	const user = req.user;
	if (req.body.otpCode === "123456") {
		res.json({ status: "SUCCESS" });
	}
};

const emailController = (req, res) => {};

module.exports = { smsOtpController, emailController };
