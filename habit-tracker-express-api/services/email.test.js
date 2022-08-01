const { SENDGRID_API_KEY, EMAIL_SERVICE_ACTIVE } = require("../config");
const EmailService = require("./email");

const emailService = new EmailService({
  isActive: EMAIL_SERVICE_ACTIVE,
  apiKey: SENDGRID_API_KEY,
});

describe("Test EmailService", () => {
  test("Stores is active config flag and nodemailer transport on instance", () => {
    expect(emailService).toHaveProperty("isActive");
    expect(emailService).toHaveProperty("transport");
  });

  test("Is inactive when testing", () => {
    expect(emailService.isActive).toBeTruthy();
    expect(emailService.transport).toBeTruthy();
  });

  describe("Test sendEmail", () => {
    test("Returns 202 status code when all goes well", async () => {
      const email = {
        to: "me@you.com",
        subject: "Test email",
        text: "This is a test email",
        html: "<h1>This is a test email</h1>",
        from: "Yaw Breezy",
      };

      const res = await emailService.sendEmail(email);
      expect(res).toEqual({ status: 202, email, error: null });
    });
    test("Returns 400 status code when something goes wrong", async () => {
      const email = {};
      const res = await emailService.sendEmail(email);
      expect(res).toEqual({
        status: 400,
        email,
        error: [{ field: `to`, message: "Missing to field." }],
      });
    });
  });
});
