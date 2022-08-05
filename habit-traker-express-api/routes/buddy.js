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
    return res.status(200).json({ url });
   }
   catch(error) {
    next(error)
   }
})

router.post('/', requireAuthenticatedUser, async (req,res,next) => {
   try {
      const user = res.locals.user
      console.log('user = ',user)
      const link = req.body.link
      console.log('link =',link)
      await Buddy.acceptBuddyRequest(user, link)
      return res.status(201).json("Buddies have been matched!")
   }
   catch(error) {
      next(error)
   }
})



module.exports = router;
