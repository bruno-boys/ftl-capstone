const express = require("express");
const Statistics = require('../models/stats');
const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get('/', async(req,res,next) => {
    res.status(200).json("main stats route works")
})

module.exports = router;