const nodemailer = require('nodemailer');
const config = require('../../config.js');

const sendEmail = async (details) => {
  const transporter = nodemailer.createTransport({
    host: config.ZuriSmtpHost,
    port: config.ZuriSmtpPort,
    auth: {
      user: config.ZuriSmtpUser,
      pass: config.ZuriSmtpPassword
    }
  });

  const message = {
    from: `${config.ZuriEmailName} <${config.ZuriEmail}>`,
    to: details.email,
    subject: details.subject,
    html: details.message
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
