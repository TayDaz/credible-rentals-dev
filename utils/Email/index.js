const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xxxxxxxx@gmail.com",
    pass: "xxxxxxxxxx",
  },
});

const Email = {
  send: async (from, to, subject, text, html) => {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      if (info.messageId) {
        return true;
      }
    } catch (err) {
      console.log(
        `[Email/.js] send ERROR occurred while trying to send  mail to (${to})`,
        err
      );
      return false;
    }
  },
};

module.exports = Email;
