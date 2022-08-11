const sgMail = require("@sendgrid/mail");
const schedule = require("node-schedule");
const { SENDGRID_API_KEY } = require("./config");
sgMail.setApiKey(SENDGRID_API_KEY);

class SendEmail {
  static async emailSend(
    user,
    resetPasswordUrl,
    APPLICATION_NAME,
    EMAIL_FROM_ADDRESS
  ) {
    console.log("user", user);
    const msg = {
      to: user.email,
      from: EMAIL_FROM_ADDRESS,
      subject: `${APPLICATION_NAME} Password Reset`,
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
        <p>The HabitTraker Team</p>
      </body>
    </html>
    `,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async scheduleReminder(habitName, frequency, time, APPLICATION_NAME, EMAIL_FROM_ADDRESS) {
    let result = time.split(":")
    let hour = result[0]
    let minute = result[1]
    console.log(`${minute} ${hour} * * *`)

    const job = schedule.scheduleJob(`${minute} ${hour} * * *`, function(){
      const msg = {
        to: "yawkesseyankomah@gmail.com",
        from: EMAIL_FROM_ADDRESS,
        subject: "Habit Reminder",
        html: 
        `
        <html>
        <body>
          <p> Hello! </p>
          <p> This is a reminder to log your ${habitName} habit</p>
          <p>Click on the link below to login and log your habit. </p>
            <a href="http://localhost:5173/activity">
              Login to Log Your Habit
            </a>
          <p>Thanks,</p>
          <p>The Habit Tracker Team</p>
        </body>
      </html>
      `,
      };
      sgMail.send(msg);
      console.log("Email sent");
    });
   
  
  }
}

// Don't forget to log your completion for your
module.exports = SendEmail;
