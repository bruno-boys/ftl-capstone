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

router.get("/tracked", requireAuthenticatedUser, async (req, res, next) => {
  const habitInfo = req.body;

  const completedCount = await Habits.getCompletedCount(habitInfo);

  res.status(200).json({ completedCount: completedCount });
});

router.get("/log", requireAuthenticatedUser, async (req,res,next) => {
  try {
    const {habitId, startTime, endTime} = req.query
    const logCount = await Habits.fetchLoggedHabitCount(habitId, startTime, endTime);
    res.status(200).json({logCount});
  }
  catch(error) {
    next(error);
  }
})

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
    res.status(201).json({ status: "Success!" });
  } catch (error) {
    next(error);
  }
});

router.put("/edit", requireAuthenticatedUser, async (req, res, next) => {
try{
  const form = req.body;
  await Habits.editHabit(form);
  res.status(200).json({ status: "Success!" });

}
catch(error){
  next(error)
}
})

router.post("/log", requireAuthenticatedUser, async (req, res, next) => {
  try {
    await Habits.logHabit(req.body.habitId);
    res.status(201).json({ status: "Habit Logged!" });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
