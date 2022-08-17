// const { config } = require("dotenv");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const SendEmail = require("../email-template.js");
const { SENDGRID_API_KEY, EMAIL_SERVICE_ACTIVE, EMAIL_FROM_ADDRESS, CLIENT_URL, APPLICATION_NAME } = require("../config");

class EmailService {
  constructor(config) {
    //initialize
    const { isActive, apiKey, emailFromAddress, clientUrl, applicationName } =
      config;

    const transport = nodemailer.createTransport(
      nodemailerSendgrid({ apiKey })
    );
    this.transport = transport;
    this.isActive = isActive;
    this.clientUrl = CLIENT_URL;
    this.emailFromAddress = emailFromAddress;
    this.applicationName = applicationName;
  }

  async sendEmail(email) {
    // Make a case when not active
    if (!this.isActive) {
      if (!email.to)
        return {
          status: 400,
          email,
          error: [{ field: `to`, message: "Missing to field." }],
        };

      console.log(`Sending email to ${email.to} from ${email.from}`);
      return { status: 202, email, error: null };
    }

    try {
      const res = await this.transport.sendMail(email);
      const status = res?.[0]?.statusCode;
      if (status === 202) return { status, email, error: null };

      return { status, email, error: res?.[0]?.body };
    
    } catch (error) {
      console.error(`Error sending email: ${error}`);

      const errors = error?.response?.body?.errors;

      return { status: 400, email, error: errors || [error] };
    }
  }
  constructPasswordResetUrl(resetToken) {
    return `${this.clientUrl}/reset-password?token=${resetToken.token}`;
  }

  async sendPasswordResetEmail(user, token) {
    const resetPasswordUrl = this.constructPasswordResetUrl(token);
    await SendEmail.emailSend(user, resetPasswordUrl, APPLICATION_NAME, EMAIL_FROM_ADDRESS);
  }

  // Figure out what I need to pass through it
  async sendReminderEmail ({reminder}) {
    console.log("Reminder in email service", reminder)
    let habitName = reminder.habit.habit_name
    let frequency = reminder.habit.frequency
    let time = reminder.reminder.time

    
    await SendEmail.scheduleReminder(habitName, frequency, time,  APPLICATION_NAME, EMAIL_FROM_ADDRESS);
  }




}

module.exports = EmailService;


