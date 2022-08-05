const express = require("express");
const Buddy = require('../models/buddy')

const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get('/', requireAuthenticatedUser, async (req,res,next) => {
   try{
    const user = res.locals.user
    let buddyId = await Buddy.generateURLId();
    const url = `http://localhost:3001/buddy/${buddyId}`
    await Buddy.populateBuddyRequestTable(user, url)
    return res.status(201).json({ url });
   }
   catch(error) {
    next(error)
   }
})

router.get('/view', requireAuthenticatedUser, async (req,res,next) => {
   try {
      const user = res.locals.user;
      const name = await Buddy.fetchBuddyName(user);
      const habits = await Buddy.fetchBuddyHabits(user);
      const loggedHabits = await Buddy.fetchTrackedBuddyHabits(user)
      return res.status(200).json({
         buddyName: name,
         buddyHabits: habits,
      })
   }
   catch(error) {
      next(error)
   }
})

router.post('/accept', requireAuthenticatedUser, async (req,res,next) => {
   try {
      const user = res.locals.user
      const link = req.body.link
      await Buddy.acceptBuddyRequest(user, link)
      return res.status(201).json("Buddies have been matched!")
   }
   catch(error) {
      next(error)
   }
})




module.exports = router;
