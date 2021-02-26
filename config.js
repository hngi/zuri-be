module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  dbPass: process.env.PASS,
  dbname: process.env.NAME,
  dbconnection: process.env.DBURL,
  JWTKey: process.env.JWTKey,
  ZuriSmtpPort: process.env.ZURI_SMTP_PORT,
  ZuriSmtpHost: process.env.ZURI_SMTP_HOST,
  ZuriSmtpUser: process.env.ZURI_SMTP_USER,
  ZuriSmtpPassword: process.env.ZURI_SMTP_PASSWORD,
  ZuriEmailName: process.env.ZURI_EMAIL_FROM_NAME,
  ZuriEmail: process.env.ZURI_FROM_EMAIL,
  ZuriUrl: process.env.ZURI_DEV_URL
};
