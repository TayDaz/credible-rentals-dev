const { authenticator, totp } = require("otplib");

const secret = process.env.TOTP_SECRET_KEY || authenticator.generateSecret();

const TOTP = {
  get: () => {
    try {
      //Normal otp
      // let token = authenticator.generate(secret);
      // console.log("Normal token", token);
      // //Normal otp
      // let isValid = authenticator.check(token, secret);
      // console.log("isValid check()", isValid);
      // // or
      // isValid = authenticator.verify({ token, secret });
      // console.log("isValid verify()", isValid);

      //totp

      totp.options = { digits: 6, step: 30, window: 1 };
      token = totp.generate(secret);
      console.log("[generateTOTP/.js] Generated TOTP = ", token);
      return token;

      // setTimeout(() => {
      // 	isValid = totp.check(token, secret);
      // 	console.log("isValid check()", isValid);

      // 	isValid = totp.verify({ token, secret });
      // 	console.log("isValid verify()", isValid);
      // }, 40000);
    } catch (err) {
      // Possible errors
      // - options validation
      // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
      console.error(err);
      return null;
    }
  },
  verify: (token) => {
    try {
      const isValid = totp.check(token, secret);
      console.log("[TOTP/.js] verify() => check(token, secret) ", isValid);
      return isValid;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

// function test() {
// 	let count1 = [0],
// 		th = this;
// 	// count1++;

// 	const interval = setInterval(
// 		(count1) => {
// 			let timeDelay = ++count1[0] * 10000;
// 			const otp = TOTP.getTOTP();

// 			setTimeout(
// 				(count1, otp, timeDelay) => {
// 					console.log(
// 						`Counter = ${count1[0]} Time Delay = ${
// 							timeDelay / 1000
// 						}s Token Generated= ${otp} `
// 					);
// 					TOTP.verifyTOTP(otp);
// 				},
// 				timeDelay,
// 				count1,
// 				otp,
// 				timeDelay
// 			);
// 		},
// 		count1[0] * 10000 + 5000,
// 		count1
// 	);
// 	if (count1 === 100) this.interval.clear();
// }

// test();

module.exports = TOTP;
