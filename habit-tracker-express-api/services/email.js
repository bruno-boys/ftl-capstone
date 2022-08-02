// const { config } = require("dotenv");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

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
    this.clientUrl = clientUrl;
    this.emailFromAddress = emailFromAddress;
    this.applicationName = applicationName;
  }

  async sendEmail(email) {
    // Make a case when not active
    if (this.isActive) {
      if (!email.to)
        return {
          status: 400,
          email,
          error: [{ field: `to`, message: "Missing to field." }],
        };

      console.log(`Sending email to ${email.to} from ${email.from}`);
      return { status: 202, email, error: null };

      console.log("Email sent");
    }

    try {
      const res = await this.transport.sendMail(email);
      const status = res?.[0]?.statusCode;
      if (status === 202) return { status, email, error: null };

      return { status, email, error: res?.[0]?.body };
    } catch (error) {
      console.error(`Error sending email: ${error}`);

      const errors = error?.response?.body?.errors;

      return { status: 400, email, error: errors || error };
    }
  }
  constructPasswordResetUrl(token) {
    return `${this.clientUrl}/reset-password?token=${token}`;
  }

  async sendPasswordResetEmail(user, token) {
    const resetPasswordUrl = this.constructPasswordResetUrl(token);

    const email = {
      to: user.email,
      from: this.emailFromAddress,
      subject: `${this.applicationName} Password Reset`,
      html: `
      <html>
        <body>
          <p>Hi ${user.firstName},</p>
          <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <a href="${resetPasswordUrl}">
              Reset your password
            </a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p>Thanks,</p>
          <p>The Habit Tracker Team</p>
        </body>
      </html>
      `,
    };
    return await this.sendEmail(email);
  }


  async sendPasswordResetConfirmationEmail(user, token) {
    const resetPasswordUrl = this.constructPasswordResetUrl(token);

    const email = {
      to: user.email,
      from: this.emailFromAddress,
      subject: `${this.applicationName} Password Reset Success`,
      html: `
      <html>
        <body>
          <p>Hi ${user.firstName},</p>
          <p>This is a confirmation of a successful password reset for your accorunt.</p>
          <p>If you did not request this, contact Yaw, Aloye, or Abdul immediately.</p>
          <p>Thanks,</p>
          <p>The Habit Tracker Team</p>
        </body>
      </html>
      `,
    };
    return await this.sendEmail(email);
  }
}

module.exports = EmailService;
