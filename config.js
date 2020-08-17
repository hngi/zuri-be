module.exports = {
  port: process.env.PORT || 5600,
  host: process.env.HOST || 'localhost',
  dbPass: process.env.PASS || 'hngi8be',
  dbname: process.env.NAME || 'hngi8be',
  // dbconnection: process.env.DBURL || 'mongodb+srv://hngi8be:hngi8be@hngi8.qqarl.mongodb.net/hngi8be?retryWrites=true&w=majority',
  dbconnection: process.env.DBURL || 'mongodb+srv://tmayor20:tmayor2020@cluster0.tui54.mongodb.net/tmayor20?retryWrites=true&w=majority',
  JWTKey: process.env.JWTKey || 'f3e29360-dd0e-438c-80b8-b33c00ee6d8c',
  ZuriSmtpPort: process.env.ZURI_SMTP_PORT || 2525,
  ZuriSmtpHost: process.env.ZURI_SMTP_HOST || 'smtp.mailtrap.io',
  ZuriSmtpUser: process.env.ZURI_SMTP_USER || '8d1ce347fdb83c',
  ZuriSmtpPassword: process.env.ZURI_SMTP_PASSWORD || '5e42f69651c52b',
  ZuriEmailName: process.env.ZURI_EMAIL_FROM_NAME || 'Zuri-Team',
  ZuriEmail: process.env.ZURI_FROM_EMAI || 'zuri@email.com',
  ZuriUrl: process.env.ZURI_DEV_URL || 'http://localhost:3000'
};
