const express = require("express");
const Habits = require("../models/habits");
const Reminders = require("../models/reminders");
const { requireAuthenticatedUser } = require("../middleware/security");
const { emailService } = require("../services");


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


router.post("/reminder", requireAuthenticatedUser , async (req, res, next) => {
  try {
    console.log(req.body.habitId)
    await Reminders.createReminder(req.body);
    let reminderId = req.body.habitId
    let reminder = await Reminders.fetchReminderById(reminderId);
    console.log("Reminder + Habit Info:", reminder)
    await emailService.sendReminderEmail({reminder})
    res.status(201).json({ status: "Reminder Created!" });
  } catch (error) {
    next(error);
  }
})

router.delete("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const reminderId = parseInt(req.params.id);
    await Reminders.deleteReminder(reminderId);
    console.log("reminderId", reminderId)
    res.status(200).json({ status: "Reminder Deleted!" });
  } catch (error) {
    next(error);
  }
})

router.put("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const reminderId = parseInt(req.params.id);
    await Reminders.editReminder(reminderId, req.body);
    res.status(200).json({ status: "Reminder Edited!" });
  } catch (error) {
    next(error);
  }
})

router.get("/reminders", requireAuthenticatedUser, async (req, res, next) => {
  try {
    let remindersList = await Reminders.fetchReminders();
    return res.status(200).json({
      reminders: remindersList,
    });
  } catch (error) {
    next(error);
  }
})

// router.post("/schedule-reminder", requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     const { habitId, time } = req.body;
//   }
// })

router.get("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const reminderId = parseInt(req.params.id);
    let reminder = await Reminders.fetchReminderById(reminderId);
    return res.status(200).json({
      reminder: reminder,
    });
  } catch (error) {
    next(error);
  }
})

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
router.get("/streak", requireAuthenticatedUser, async (req, res,next) => {
  try{

    const {habitId, startDate, endDate} = req.query
    console.log(req.query)
    const streakCount = await Habits.fetchStreakCount(habitId, startDate, endDate)
    console.log("streak count", streakCount.current_streak)
    res.status(200).json({streakCount : streakCount.current_streak})

  } catch(error){
    next(error)
  }

})

router.post("/streak", requireAuthenticatedUser, async(req, res, next) => {
  try {
    await Habits.logProgress(req.body);
    console.log("req.body", req.body)
    res.status(201).json({ status: "Progress Logged!" });
  } catch (error) {
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
    await Habits.logHabit(req.body);
    res.status(201).json({ status: "Habit Logged!" });
  } catch (error) {
    next(error);
  }
})





module.exports = router;
