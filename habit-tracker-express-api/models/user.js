const { BadRequestError, UnauthorizedError } = require("../utils/error");
const bcrypt = require("bcrypt");
const db = require("../db");

class User {
  static async makePublicUser(user) {
    /*details out the information which the API will return to the user 
            upon registering or logging in */
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userName: user.username,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided.");
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }

  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided.");
    }

    const query = `SELECT * FROM users WHERE username = $1`;

    const result = await db.query(query, [username]);

    const user = result.rows[0];

    return user;
  }

  static async fetchUserByPhoneNumber(phoneNumber) {
    //TODO: make a function for fetching user by phone number
  }

  static async register(credentials) {
    /* user should submit their first name, last name, email, phone number, username, and password
           if any of these fields are missing, throw an error */
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "userName",
      "phoneNumber",
      "password",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    /* make sure no user already exists in the system with that email
           if one does, throw an error */
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(
        `Duplicate email: ${credentials.email}. Please proceed to login page.`
      );
    }

    /* takes the user's password, and hashes it.
           take the user's email, and lowercases it */
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const lowercasedEmail = credentials.email.toLowerCase();

    /* create a new user in the database with all the
            info provided info, and then returns the user */
    const result = await db.query(
      `
        INSERT INTO users (
            first_name,
            last_name,
            email,
            username,
            phone_number,
            password
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, first_name, last_name, email, username, password, created_at, phone_number, updated_at;
        `,
      [
        credentials.firstName,
        credentials.lastName,
        lowercasedEmail,
        credentials.userName,
        credentials.phoneNumber,
        hashedPassword,
      ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  static async login(credentials) {
    /* user should submit their username and password
            if any of these fields are missing, throw an error */
    const requiredFields = ["userName", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    // lookup the user in the db by email
    const user = await User.fetchUserByUsername(credentials.userName);

    /* if a user is found, compare the submitted password
            with the password in the db. if there is a match, return the user */
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    // if any of this goes wrong, throw an error
    throw new UnauthorizedError("Invalid username/password combo");
  }

  static async savePasswordResetToken(email, resetToken) {
    const result = await db.query(
      `
        UPDATE users
        SET pw_reset_token = $1, pw_reset_token_exp = $2
        WHERE email = $3
        RETURNING id, email, username, created_at, updated_at;
        `,
      [resetToken.token, resetToken.expiresAt, email.toLowerCase()]
    );
    const user = result.rows[0];

    if (user) return User.makePublicUser(user);
  }

  static async resetPassword(resetToken, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `
          UPDATE users
          SET password           = $1,
              pw_reset_token     = NULL,
              pw_reset_token_exp = NULL
          WHERE pw_reset_token = $2
            AND pw_reset_token_exp > NOW()
          RETURNING id, email, username, first_name, last_name, created_at, updated_at;
          `,
      [hashedPassword, resetToken]
    );

    const user = result.rows[0];

    if (user) return User.makePublicUser(user);

    throw new BadRequestError("That token is either expired or invalid.");
  }
}

module.exports = User;
