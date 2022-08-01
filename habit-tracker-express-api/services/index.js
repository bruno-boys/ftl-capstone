const { SENDGRID_API_KEY, EMAIL_SERVICE_ACTIVE } = require("../config");
const EmailService = require("./email");

const emailService = new EmailService({
  isActive: EMAIL_SERVICE_ACTIVE,
  apiKey: SENDGRID_API_KEY,
});

module.exports = { emailService };
