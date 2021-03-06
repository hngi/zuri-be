const nodemailer = require('nodemailer');
const config = require('../../config');

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
  const sent = await transporter.sendMail(message);
  return sent;
};

module.exports = sendEmail;
