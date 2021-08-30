const twilio = require("twilio");
require("dotenv").config();

// Your Account SID from www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID;

// Your Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

const client = new twilio(accountSid, authToken);

const SMS = {
  send: async (to, body) => {
    try {
      const message = await client.messages.create({
        body,
        to,
        from: fromNumber, // From a valid Twilio number
      });

      if (message?.sid) return true;

      return false;
    } catch (err) {
      console.log("[utils/SMS/.js] ERROR send() ", err);
      return false;
    }
  },
};

module.exports = SMS;
