import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import EditForm from "../EditForm/EditForm";
import Modal from "../../utils/Modal";
import { Link } from "react-router-dom";
import HabitForm from "../HabitForm/HabitForm";
import AddReminder from "../AddReminder";
import HabitMenu from "../HabitMenu";

export default function HabitPage() {
	const [habits, setHabits] = useState([]);
	const [filteredHabits, setFilteredHabits] = useState([]);
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [errors, setErrors] = useState("");
	const [buddy, setBuddy] = useState();
	const [form, setForm] = useState({
		habitName: "",
		startDate: "",
		endDate: "",
		frequency: "",
		period: "Per Day",
	});

	const [duration, setDuration] = useState("All Habits");

	const durationOptions = [
		{ key: 1, label: "Past Habits", value: "Past Habits" },
		{ key: 2, label: "Current Habits", value: "Current Habits" },
		{ key: 3, label: "Future Habits", value: "Future Habits" },
		{ key: 4, label: "All Habits", value: "All Habits" },
	];

	useEffect(() => {
		const getHabits = async () => {
			const { data, error } = await apiClient.fetchHabitList();
			if (error) {
				setErrors(error);
			}
			if (data?.habits) {
				setHabits(data.habits);
				setFilteredHabits(data.habits);
			}
		};

		const getBuddyData = async () => {
			const { data, error } = await apiClient.fetchBuddyData();
			if (error) {
				setErrors(error);
			}
			if (data) {
				setBuddy(data);
			}
		};

		getHabits();
		getBuddyData();
	}, []);

	const closeModal = () => {
		setVideoModalOpen(false);
		setForm({
			habitName: "",
			startDate: "",
			frequency: "",
			period: "Per Day",
		});
		window.location.reload();
	};

	const handleOnInputChange = (event) => {
		setDuration(event.target.value);
	};

	useEffect(() => {
		let today = new Date();
		today.setHours(0, 0, 0, 0);

		if (duration == "Past Habits") {
			setFilteredHabits(habits.filter((habit) => new Date(habit.end_date).getTime() < today.getTime()));
		}
		if (duration == "Current Habits") {
			setFilteredHabits(
				habits.filter(
					(habit) => new Date(today).getTime() >= new Date(habit.start_date).getTime() && today.getTime() < new Date(habit.end_date).getTime()
				)
			);
		}
		if (duration == "Future Habits") {
			setFilteredHabits(habits.filter((habit) => new Date(habit.start_date).getTime() > today.getTime()));
		}
		if (duration == "All Habits") {
			setFilteredHabits(habits);
		}
	}, [duration]);

	return (
		<div className='habit-page'>
			{/* <Header /> */}
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							<div className='flex flex-wrap -mx-3 mb-4'>
								<div className='w-full px-3'>
									<label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='duration'>
										Duration
									</label>
									<select
										name='duration'
										type='text'
										value={duration}
										className='form-input w-full text-gray-800'
										onChange={handleOnInputChange}
										required>
										{durationOptions.map((duration) => (
											<option key={duration.key} value={duration.label}>
												{duration.label}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className='hp-top'>
								<h1 className='hp-title'>All Habits</h1>
								<div
									id='hp-create-btn-wrapper'
									className='btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3'
									style={{ marginRight: "20px", marginBottom: "0.25rem" }}>
									<span
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											setVideoModalOpen(true);
										}}
										aria-controls='modal'>
										Create Habit
									</span>
								</div>
							</div>
							<HabitGrid setFormModalOpen={setFormModalOpen} habits={filteredHabits} errors={errors} setErrors={setErrors} />
						</div>
					</div>
					``
					{/* Modal */}
					<Modal id='create-habit-modal' ariaLabel='modal-headline' show={videoModalOpen} handleClose={closeModal}>
						<div className='relative pb-9/16'>
							<div className='create-habit'>
								<HabitForm form={form} setForm={setForm} handleClose={closeModal} />
							</div>
						</div>
					</Modal>
				</section>
			</main>
		</div>
	);
}

function HabitGrid({ habits, formModalOpen, setFormModalOpen, handleClose }) {
	return (
		<div className='gridContent'>
			{habits?.map((habit, idx) => {
				return <HabitCard key={idx} habit={habit} formModalOpen={formModalOpen} setFormModalOpen={setFormModalOpen} handleClose={handleClose} />;
			})}
		</div>
	);
}

function HabitCard({ habit, formModalOpen, setFormModalOpen, handleClose }) {
	const [logCount, setLogCount] = useState(0);
	const [streakCount, setStreakCount] = useState(0);
	const [errors, setErrors] = useState();
	const [startDate, setStartDate] = useState(new Date(habit.temp_start_date));
	const [endDate, setEndDate] = useState(new Date(habit.temp_end_date));
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [reminderModalOpen, setReminderModalOpen] = useState(false);

	const [tab, setTab] = useState(1);

	let today = new Date();
	today.setHours(0, 0, 0, 0);
	today.setDate(today.getDate());

	const formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return [year, month, day].join("-");
	};

	const formatLogProgressDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + 1,
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return [year, month, day].join("-");
	};
	const setPeriodEndDate = (start, date, period) => {
		if (period == "Per Day") {
			start.setFullYear(today.getFullYear());
			start.setMonth(today.getMonth());
			start.setDate(today.getDate());
			date.setFullYear(today.getFullYear());
			date.setMonth(today.getMonth());
			date.setDate(today.getDate() + 1);
			setEndDate(date);
			setStartDate(start);
		}

		if (period == "Per Week") {
			let daysAfterEndDate = today.getTime() - date.getTime();
			daysAfterEndDate = daysAfterEndDate / (1000 * 3600 * 24);
			let daysAfterNextStartDate = daysAfterEndDate - (daysAfterEndDate % 7);
			start.setDate(new Date(date).getDate() + daysAfterNextStartDate);
			date.setDate(date.getDate() + (7 + daysAfterNextStartDate));
			setEndDate(date);
			setStartDate(start);
		}

		if (period == "Per Month") {
			start.setMonth(start.getMonth() + 1);
			setStartDate(start);
			date.setMonth(date.getMonth() + 1);
			setEndDate(date);
		}
	};

	const updateLog = async (event) => {
		event.preventDefault();
		const anotherDay = new Date(endDate).toISOString();
		const { data, error } = await apiClient.logHabit({
			id: habit.id,
			startDate: formatDate(startDate),
			endDate: formatDate(anotherDay),
		});
		if (error) {
			setErrors(error);
		}
		fetchLogCount();
	};

	const logCompletedAndMissedHabits = async () => {
		if (today.getTime() >= endDate.getTime()) {
			if (logCount >= habit.frequency) {
				if (habit.period == "Per Month") {
					await apiClient.logProgress({
						habitId: habit.id,
						startDate: formatLogProgressDate(startDate),
						endDate: formatLogProgressDate(endDate),
						current_streak: streakCount + 1,
					});
				} else {
					await apiClient.logProgress({
						habitId: habit.id,
						startDate: formatDate(startDate),
						endDate: formatDate(endDate),
						current_streak: streakCount + 1,
					});
				}
			}

			const { data, error } = await apiClient.getCompletedCount(habit.id);
			const results = await apiClient.getMissedCount(habit.id);
			const missedCount = results.data.missedCount.missed_count;

			const completedCount = data.completedCount.completed_count;
			if (completedCount < 1) {
				if (logCount >= habit.frequency) {
					const { results, errors } = await apiClient.createCompleted({ id: habit.id, completedCount: 1 });
				}
			} else if (completedCount >= 1) {
				if (logCount >= habit.frequency) {
					const { results, errors } = await apiClient.editCompleted({ id: habit.id, completedCount: completedCount + 1 });
				}
			}
			if (missedCount < 1) {
				if (logCount < habit.frequency) {
					const { results, errors } = await apiClient.createMissed({ id: habit.id, missedCount: 1 });
				}
			} else if (missedCount >= 1) {
				if (logCount < habit.frequency) {
					const { results, errors } = await apiClient.editMissed({ id: habit.id, missedCount: missedCount + 1 });
				}
			}

			const obj = {
				id: habit.id,
				habitName: habit.habit_name,
				frequency: habit.frequency,
				period: habit.period,
				startDate: habit.start_date,
				endDate: habit.end_date,
			};

			setPeriodEndDate(startDate, endDate, habit.period);
			const tempObj = { tempStartDate: formatDate(startDate), tempEndDate: formatDate(endDate) };
			const result = await apiClient.editHabit({ ...obj, ...tempObj });
			location.reload();
		}
	};

	const fetchLogCount = async () => {
		const anotherDay = new Date(endDate).toISOString();
		const anotherStart = new Date(startDate).toISOString();
		const logObj = {
			habitId: habit.id,
			startTime: formatDate(anotherStart),
			endTime: formatDate(anotherDay),
		};

		const { data, error } = await apiClient.fetchLoggedHabitCount(logObj);
		if (error) {
			setErrors(error);
		}
		if (data?.logCount) {
			localStorage.setItem(`log_count_${habit.id}`, data.logCount.count);
			await setLogCount(localStorage.getItem(`log_count_${habit.id}`));
		}
	};

	const fetchstreakCount = async () => {
		const previousStartDate = new Date(startDate);
		const previousEndDate = new Date(endDate);
		if (habit.period == "Per Day") {
			previousEndDate.setDate(previousEndDate.getDate() - 1);
			previousStartDate.setDate(previousEndDate.getDate() - 1);
		}

		if (habit.period == "Per Week") {
			previousEndDate.setDate(previousEndDate.getDate() - 7);
			previousStartDate.setDate(previousStartDate.getDate() - 7);
		}

		if (habit.period == "Per Month") {
			previousEndDate.setMonth(previousEndDate.getMonth() - 1);
			previousEndDate.setDate(1);
			previousStartDate.setMonth(previousStartDate.getMonth() - 1);
			previousStartDate.setDate(1);
		}

		const logData = {
			habitId: habit.id,
			startDate: formatDate(previousStartDate),
			endDate: formatDate(previousEndDate),
		};

		const { data, error } = await apiClient.fetchStreakCount(logData);
		setStreakCount(data.streakCount);
	};
	const closeModal = async () => {
		window.location.reload();
		await setFormModalOpen(false);
		await setFormModalOpen(false);
	};

	const deleteHabit = async () => {
		const { data, err } = await apiClient.deleteHabit(habit.id);
		if (err) {
			setErrors(err);
		}
		if (data) {
			window.location.reload();
		}
	};

	useEffect(() => {
		fetchLogCount();
	}, []);

	useEffect(() => {
		fetchstreakCount();
	}, []);

	useEffect(() => {
		logCompletedAndMissedHabits();
	}, []);

	return (
		<div className='habit-card'>
			<section className='relative'>
				{/* Section background (needs .relative class on parent and next sibling elements) */}
				<div className='relative max-w-6xl mx-auto px-4 sm:px-6'>
					{/* Content */}
					<div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6' data-aos='fade-right'>
						{/* Tabs buttons */}
						<div className='mb-8 md:mb-0'>
							<a
								id='habit-cards'
								className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
									tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
								}`}
								href='#0'
								onClick={(e) => {
									e.preventDefault();
									setTab(1);
								}}>
								<div className='card' style={{ width: "100%" }}>
									<div className='top'>
										<Link style={{ width: "100%" }} to={`/habit/${habit.id}`} state={streakCount}>
											<div className='title'>
												<div className='font-bold leading-snug tracking-tight mb-1' style={{ width: "100%" }}>
													{habit.habit_name}
												</div>
											</div>
										</Link>
										<div className='buttons'>
											<HabitMenu
												deleteHabit={deleteHabit}
												updateLog={updateLog}
												setVideoModalOpen={setVideoModalOpen}
												setReminderModalOpen={setReminderModalOpen}
											/>
										</div>
									</div>
									<Link to={`/habit/${habit.id}`} state={streakCount}>
										<div className='bottom'>
											{logCount >= habit.frequency ? (
												<div className='text-gray-600' style={{ color: "green", marginTop: "5px" }}>
													{logCount}/{habit.frequency} Times {habit.period}
												</div>
											) : (
												<div className='text-gray-600' style={{ marginTop: "5px" }}>
													{logCount}/{habit.frequency} {habit.period}
												</div>
											)}
										</div>
									</Link>
								</div>
							</a>
						</div>
						{/* Modal */}
						<Modal id='habit-detail-modal' ariaLabel='modal-headline' show={videoModalOpen} handleClose={handleClose}>
							<div className='relative pb-9/16'>
								<div className='create-habit'>
									<EditForm habitId={habit.id} />
								</div>
							</div>
						</Modal>
						<Modal id='habit-reminder-modal' ariaLabel='modal-headline' show={reminderModalOpen} handleClose={handleClose}>
							<div className='relative pb-9/16'>
								<div className='create-habit'>
									<AddReminder habitId={habit.id} />
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</section>
		</div>
	);
}
