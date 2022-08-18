const express = require("express");
const Buddy = require("../models/buddy");

const { requireAuthenticatedUser } = require("../middleware/security");

const router = express.Router();

router.get("/", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		let buddyId = await Buddy.generateURLId();
		const url = `http://localhost:5173/buddy/${buddyId}`;
		await Buddy.populateBuddyRequestTable(user, url);
		return res.status(201).json({ url });
	} catch (error) {
		next(error);
	}
});

router.get("/buddy-name", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { link } = req.query;
		let name = await Buddy.fetchBuddyNameFromLink(link);
		return res.status(201).json({ name });
	} catch (error) {}
});

router.get("/view", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const buddyInfoArr = await Buddy.fetchBuddyInfo(user);
		return res.status(200).json(buddyInfoArr);
	} catch (error) {
		next(error);
	}
});

router.get("/habits", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { buddyId } = req.query;
		const buddyHabits = await Buddy.fetchBuddyHabits(buddyId);
		return res.status(200).json(buddyHabits);
	} catch (error) {
		next(error);
	}
});

router.get("/habits/:id", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const { buddyId } = req.query;
		const habitId = req.params.id;
		const buddyHabit = await Buddy.fetchBuddyHabitById(buddyId, habitId);
		return res.status(200).json(buddyHabit);
	} catch (error) {
		next(error);
	}
});

router.post("/accept", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const link = req.body.link;
		await Buddy.acceptBuddyRequest(user, link);
		return res.status(201).json("Buddies have been matched!");
	} catch (error) {
		next(error);
	}
});

router.delete("/decline", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const link = req.body.link;
		await Buddy.deleteBuddyRequest(link);
		return res.status(201).json("Buddies Request has been declined!");
	} catch (error) {
		next(error);
	}
});

router.delete("/remove", requireAuthenticatedUser, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const buddyId = req.body.id;
		await Buddy.removeBuddy(user, buddyId);
		return res.status(200).json("Buddy has been removed!");
	} catch (error) {
		next(error);
	}
});

module.exports = router;
