const express = require("express");
const Statistics = require('../models/stats');
const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get('/', requireAuthenticatedUser, async(req,res,next) => {
    res.status(200).json("main stats route works")
})

router.get('/habit-streaks', requireAuthenticatedUser, async(req,res,next) => {
    try {
        res.status(200).json("main stats route works")
    }
    catch(error) {
        next(error)
    }
})


module.exports = router;