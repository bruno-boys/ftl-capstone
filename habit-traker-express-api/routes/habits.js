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
    console.log("Query", req.query)
    const streakCount = await Habits.fetchStreakCount(habitId, startDate, endDate)
    console.log("streak count in get request route", streakCount.current_streak)
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

router.get("/missed/:id", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const habitId = parseInt(req.params.id)
    const missedCount = await Habits.fetchMissedCount(habitId)
    console.log("missed count returned by model", missedCount)
    if (!missedCount){
      res.status(200).json({missedCount: {missed_count : 0}})
    }
    else{
      res.status(200).json({missedCount: missedCount})
    }
  } catch(error){
    next (error)
  }
})

router.get("/completed/:id", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const habitId = parseInt(req.params.id)
    console.log("habit id used to get the completed count", habitId)
    const completedCount = await Habits.fetchCompletedCount(habitId)
    console.log("completed count returned by model", completedCount)
    if (!completedCount){
      res.status(200).json({completedCount: {completed_count : 0}})
    }
    else{
      res.status(200).json({completedCount: completedCount})
    }
  } catch(error){
    next (error)
  }
})

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

router.post("/completed", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const completedForm = req.body
    
    await Habits.logComplete(completedForm)
    res.status(201).json({status : "complete"})
  } catch(error){
    next(error)
  }
})

router.put("/completed", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const completedForm = req.body
    await Habits.editCompleted(completedForm)
    res.status(201).json({status : "complete"})
  } catch(error){
    next(error)
  }
})
router.post("/missed", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const missedForm = req.body
    await Habits.logMissed(missedForm)
    res.status(201).json({status : "complete"})
  } catch(error){
    next(error)
  }
})

router.put("/missed", requireAuthenticatedUser, async (req, res, next) => {
  try{
    const missedForm = req.body
    await Habits.editMissed(missedForm)
    res.status(201).json({status : "complete"})
  } catch(error){
    next(error)
  }
})


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
