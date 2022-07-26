const express = require("express");
const Habits = require("../models/habits");
const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get("/", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    let habitList = await Habits.fetchHabitList(user);
    return res.status(200).json({
      habits: habitList,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/create", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    await Habits.createHabit(user, req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
