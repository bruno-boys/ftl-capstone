// const { config } = require("dotenv");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

class EmailService {
  constructor(config) {
    //initialize
    const { isActive, apiKey } = config;

    const transport = nodemailer.createTransport(
      nodemailerSendgrid({ apiKey })
    );

    this.transport = transport;
    this.isActive = isActive;
  }

  async sendEmail(email) {
    // Make a case when not active
    if (this.isActive) {
        if(!email.to) return { status: 400, email, error: [{ field: `to`, message: "Missing to field." }] };

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

        const errors =  error?.response?.body?.errors

        return { status: 400, email, error: errors || error};
    }
  }
}

module.exports = EmailService;
