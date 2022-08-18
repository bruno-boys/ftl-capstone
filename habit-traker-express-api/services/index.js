const { SENDGRID_API_KEY, EMAIL_SERVICE_ACTIVE, EMAIL_FROM_ADDRESS, CLIENT_URL, APPLICATION_NAME } = require("../config");
const EmailService = require("./email");

const emailService = new EmailService({
	isActive: EMAIL_SERVICE_ACTIVE,
	apiKey: SENDGRID_API_KEY,
	emailFromAddress: EMAIL_FROM_ADDRESS,
	clientUrl: CLIENT_URL,
	applicationName: APPLICATION_NAME,
});

module.exports = { emailService };
