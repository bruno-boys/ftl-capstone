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

router.post("/reminder", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		await Reminders.createReminder(user, req.body);
		let reminder = await Reminders.fetchReminderById(user, req.body.habitId);
		await emailService.sendReminderEmail({ reminder, user });
		res.status(201).json({ status: "Reminder Created!" });
	} catch (error) {
		next(error);
	}
});

router.delete("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const reminderId = parseInt(req.params.id);
		await Reminders.deleteReminder(user, reminderId);
		res.status(200).json({ status: "Reminder Deleted!" });
	} catch (error) {
		next(error);
	}
});

router.put("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const reminderId = parseInt(req.params.id);
		await Reminders.editReminder(reminderId, req.body);
		res.status(200).json({ status: "Reminder Edited!" });
	} catch (error) {
		next(error);
	}
});

router.get("/reminders", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		let remindersList = await Reminders.fetchRemindersList(user);
		return res.status(200).json({
			reminders: remindersList,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/reminder/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const reminderId = parseInt(req.params.id);
		let reminder = await Reminders.fetchReminderById(user, reminderId);
		return res.status(200).json({
			reminder: reminder,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/log", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { habitId, startTime, endTime } = req.query;
		const logCount = await Habits.fetchLoggedHabitCount(habitId, startTime, endTime);
		res.status(200).json({ logCount });
	} catch (error) {
		next(error);
	}
});
router.get("/streak", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { habitId, startDate, endDate } = req.query;
		const streakCount = await Habits.fetchStreakCount(habitId, startDate, endDate);
		res.status(200).json({ streakCount: streakCount.current_streak });
	} catch (error) {
		next(error);
	}
});

router.post("/streak", requireAuthenticatedUser, async (req, res, next) => {
	try {
		await Habits.logProgress(req.body);
		res.status(201).json({ status: "Progress Logged!" });
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

router.get("/missed/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const habitId = parseInt(req.params.id);
		const missedCount = await Habits.fetchMissedCount(habitId);
		if (!missedCount) {
			res.status(200).json({ missedCount: { missed_count: 0 } });
		} else {
			res.status(200).json({ missedCount: missedCount });
		}
	} catch (error) {
		next(error);
	}
});

router.get("/completed/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const habitId = parseInt(req.params.id);
		const completedCount = await Habits.fetchCompletedCount(habitId);
		if (!completedCount) {
			res.status(200).json({ completedCount: { completed_count: 0 } });
		} else {
			res.status(200).json({ completedCount: completedCount });
		}
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

router.post("/completed", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const completedForm = req.body;

		await Habits.logComplete(completedForm);
		res.status(201).json({ status: "complete" });
	} catch (error) {
		next(error);
	}
});

router.put("/completed", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const completedForm = req.body;
		await Habits.editCompleted(completedForm);
		res.status(201).json({ status: "complete" });
	} catch (error) {
		next(error);
	}
});
router.post("/missed", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const missedForm = req.body;
		await Habits.logMissed(missedForm);
		res.status(201).json({ status: "complete" });
	} catch (error) {
		next(error);
	}
});

router.put("/missed", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const missedForm = req.body;
		await Habits.editMissed(missedForm);
		res.status(201).json({ status: "complete" });
	} catch (error) {
		next(error);
	}
});

router.put("/edit", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const form = req.body;
		await Habits.editHabit(form);
		res.status(200).json({ status: "Success!" });
	} catch (error) {
		next(error);
	}
});

router.post("/log", requireAuthenticatedUser, async (req, res, next) => {
	try {
		await Habits.logHabit(req.body);
		res.status(201).json({ status: "Habit Logged!" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
