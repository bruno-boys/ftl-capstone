const express = require("express");
const User = require("../models/user");
const { createUserJwt, generatePasswordResetToken } = require("../utils/tokens");
const { requireAuthenticatedUser } = require("../middleware/security");
const { emailService } = require("../services");

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
    /*take user first name, last name, email, phone number, 
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
    console.log("res.locals", res.locals.user)
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuthenticatedUser, async (req, res, next) => {
  try {
    console.log("Res.locals", res.locals)
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
   
    //function to list activity stuff
    const publicUser = await User.makePublicUser(user);
    console.log("public User", publicUser)
    return res.status(200).json({ user: publicUser });
  } catch (error) {
    next(error);
  }
});

router.post("/recover", async (req, res, next) => {
  try {
    const {email} = req.body;
    console.log("email", email)
    const resetToken = generatePasswordResetToken()
    const user = await User.savePasswordResetToken(email, resetToken);

    if (user) {
      await emailService.sendPasswordResetEmail(user, resetToken);
    }
    return res.status(200).json({ message: "If your account exists in our system, you should receive an email shortly." });

  }
  catch (error) {
    next(error);
  }
})

router.post("/password-reset", async (req, res, next) => {
  try {
    const { token } = req.query
    const { newPassword } = req.body;
   
    const user = await User.resetPassword( token, newPassword);

    if (user) {
      // await emailService.sendPasswordResetConfirmationEmail(user);
    }

    return res.status(200).json({ message: "Password Successfuly reset" });

  }
  catch (error) {
    next(error);
  }
})



router.put("/editUser", requireAuthenticatedUser, async (req, res, next) => {
  try{

    const userInformation = req.body
    console.log("user information", req.body)
    
    const finalResults = await User.editUser(userInformation)

     res.status(200).json({status : finalResults})


  }
  catch(error){
    next(error)
  }
})

router.put("/editPhoto", requireAuthenticatedUser, async(req, res, next) => {
  try {
    const userPhoto = req.body
    console.log("user photo", userPhoto)
    const profilePhoto = await User.editPhoto(userPhoto)

    res.status(200).json({profilePhoto : profilePhoto})

    
  } catch (error) {
    next (error)
    
  }
})

module.exports = router;
