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

router.get("/:id", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const habitId = parseInt(req.params.id);
    const habit = await Habits.fetchHabitById(user, habitId);
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const habitId = parseInt(req.params.id);
    await Habits.deleteHabit(user, habitId);
    res.status(200).json({ message: "Habit deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/create", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    await Habits.createHabit(user, req.body);
    res.status(200).json({ status: "Success!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
