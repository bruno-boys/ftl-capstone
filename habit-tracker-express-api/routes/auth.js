const express = require("express");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json("main auth route works");
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    /*take user first name, last name, email, username, phone number, 
        and password and creates a new user in database */
    const user = await User.register(req.body);
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //take username and passwords and attempt to authenticate
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    //function to list activity stuff
    const publicUser = await User.makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
