const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class SendEmail {

  static async emailSend(user, resetPasswordUrl, APPLICATION_NAME, EMAIL_FROM_ADDRESS) {

    const msg = {
      to: user.email,
      from: EMAIL_FROM_ADDRESS,
      subject: `${APPLICATION_NAME} Password Reset`,
      html: `
    <html>
      <body>
        <p>Hi ${user.userName},</p>
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
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

//   static async sendpwdResetConfirmationEmail(user, EMAIL_FROM_ADDRESS, APPLICATION_NAME) {

//     const msg = {
//         to: user.email,
//         from: EMAIL_FROM_ADDRESS,
//         subject: `${APPLICATION_NAME} Password Reset`,
//         html: `
//       <html>
//         <body>
//           <p>Hi ${user.userName},</p>
//           <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
//           <p>Please click on the following link, or paste this into your browser to complete the process:</p>
//             <a href="${resetPasswordUrl}">
//               Reset your password
//             </a>
//           <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
//           <p>Thanks,</p>
//           <p>The Habit Tracker Team</p>
//         </body>
//       </html>
//       `,
//       };
//       sgMail
//         .send(msg)
//         .then(() => {
//           console.log("Email sent");
//         })
//         .catch((error) => {
//           console.error(error);
//           console.log("Email not sent");
//         });

//    }
}

module.exports = SendEmail;
//sendpwdResetConfirmationEmail


//     const email = {
//       to: user.email,
//       from: EMAIL_FROM_ADDRESS,
//       subject: `${APPLICATION_NAME} Password Reset Success`,
//       html: `
//       <html>
//         <body>
//           <p>Hi ${user.firstName},</p>
//           <p>This is a confirmation of a successful password reset for your accorunt.</p>
//           <p>If you did not request this, contact Yaw, Aloye, or Abdul immediately.</p>
//           <p>Thanks,</p>
//           <p>The Habit Tracker Team</p>
//         </body>
//       </html>
//       `,
//     }
//     sgMail
//     .send(email)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//       console.log("Email not sent");
//     });

