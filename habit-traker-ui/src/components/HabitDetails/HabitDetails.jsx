import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../partials/Header";
import Modal from "../../utils/Modal";
import EditForm from "../EditForm/EditForm";
import apiClient from "../../services/apiClient";
import { useLocation } from "react-router-dom";
import "./HabitDetails.css";
import PieChart from "./PieChart";

export default function HabitDetails() {
	//gets the habitId from the URL
	const { habitId } = useParams();
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [habit, setHabit] = useState({});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const [completedHabits, setCompletedHabits] = useState(0);
	const [missedHabits, setMissedHabits] = useState(0);
	const [buddyHabit, setBuddyHabit] = useState();
	const streakCount = location.state;

	useEffect(() => {
		const getHabitById = async () => {
			const { data, err } = await apiClient.fetchHabitById(habitId);
			if (err) {
				setError(err);
			}
			if (data) {
				setHabit(data);
			}
		};
		getHabitById();
		getBuddyHabits();
	}, []);

	const getBuddyHabits = async () => {
		const buddyId = parseInt(localStorage.getItem("buddyId"));
		const { data, error } = await apiClient.fetchBuddyHabitById(buddyId, habitId);
		if (error) {
			setError(error);
		}
		if (data) {
			setBuddyHabit(data);
		}
	};

	useEffect(() => {
		const getCompletedHabitsCount = async () => {
			const { data, error } = await apiClient.getCompletedCount(habitId);
			setCompletedHabits(data.completedCount.completed_count);
		};

		const getMissedHabitsCount = async () => {
			const results = await apiClient.getMissedCount(habitId);
			const missedCount = results.data.missedCount.missed_count;
			setMissedHabits(missedCount);
		};

		getCompletedHabitsCount();
		getMissedHabitsCount();
	}, []);

	const deleteHabit = async () => {
		const { data, err } = await apiClient.deleteHabit(habitId);
		if (err) {
			setError(err);
		}
		if (data) {
			navigate("/activity");
		}
	};

	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			<Header />
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							<div className='detail-buttons'>
								{localStorage.getItem("buddyView") == "false" ? (
									<>
										<h1>{habit.habit_name}</h1>
										<button
											className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3'
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setVideoModalOpen(true);
											}}
											aria-controls='modal'>
											Edit
										</button>
										<button
											className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3'
											onClick={deleteHabit}
											style={{ backgroundColor: "red" }}>
											Delete
										</button>
									</>
								) : (
									<>
										<h1>{buddyHabit?.habit_name}</h1>
									</>
								)}
							</div>
							<div className='habit-detail-page'>
								<HabitDetailContainer
									missedHabits={missedHabits}
									completedHabits={completedHabits}
									buddyHabit={buddyHabit}
									habit={habit}
									streakCount={streakCount}
								/>
							</div>
						</div>
						{/* Modal */}
						<div id='habit-details-modal'>
							<Modal
								id='habit-detail-modal'
								ariaLabel='modal-headline'
								show={videoModalOpen}
								handleClose={() => {
									setVideoModalOpen(false);
								}}>
								<div className='relative pb-9/16'>
									<div className='create-habit'>
										<EditForm habitId={habitId} />
									</div>
								</div>
							</Modal>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function HabitDetailContainer({ missedHabits, completedHabits, habit, streakCount, buddyHabit }) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	let periodLabel;
	{
		localStorage.getItem("buddyView") == "false" ? (periodLabel = getPeriod(habit?.period)) : (periodLabel = getPeriod(buddyHabit?.period));
	}
	const [tab, setTab] = useState(1);

	function getPeriod(period) {
		if (period == "Per Day") {
			return "Every day";
		} else if (period == "Per Week") {
			return "Every week";
		} else if (period == "Per Month") {
			return "Every month";
		} else {
			return "Every year";
		}
	}

	return (
		<div className='habit-detail-container'>
			<div className='subtitle'>
				<div className='periodLabel'>{periodLabel}</div>
				{localStorage.getItem("buddyView") == "false" ? (
					<div className='habit-frequency'>
						{habit.frequency} times {habit.period}
					</div>
				) : (
					<div className='habit-frequency'>
						{buddyHabit?.frequency} times {buddyHabit?.period}
					</div>
				)}
			</div>
			<div className='habit-details'>
				<div className='left'>
					<div className='mb-8 md:mb-0'>
						<a
							className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
								tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
							}`}
							onClick={(e) => {
								e.preventDefault();
								setTab(1);
							}}
							style={{ width: "540px", marginTop: "1rem" }}>
							<div>
								<div id='streak' className='font-bold leading-snug tracking-tight mb-1'>
									Current Streak
								</div>
							</div>
							<div className='streak-count'>{streakCount ? streakCount : 0}</div>
						</a>
						<div className='status-days'>
							<a
								className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
									tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
								}`}
								onClick={(e) => {
									e.preventDefault();
									setTab(1);
								}}
								style={{ width: "170px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<div>
									<div id='streak' className='font-bold leading-snug tracking-tight mb-1'>
										Complete
									</div>
								</div>
								<div>{completedHabits}</div>
							</a>

							<a
								className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
									tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
								}`}
								onClick={(e) => {
									e.preventDefault();
									setTab(1);
								}}
								style={{ width: "170px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<div>
									<div id='streak' className='font-bold leading-snug tracking-tight mb-1'>
										Missed
									</div>
								</div>
								<div>{missedHabits}</div>
							</a>

							<a
								className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
									tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
								}`}
								onClick={(e) => {
									e.preventDefault();
									setTab(1);
								}}
								style={{ width: "170px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<div>
									<div id='streak' className='font-bold leading-snug tracking-tight mb-1'>
										Total
									</div>
								</div>
								<div>{completedHabits + missedHabits}</div>
							</a>
						</div>
					</div>
				</div>
				<div className='right'>
					<div className='mb-8 md:mb-0'>
						<a
							className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
								tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"
							}`}
							onClick={(e) => {
								e.preventDefault();
								setTab(1);
							}}
							style={{ width: "540px", height: "500px", marginTop: "4rem", marginLeft: "1rem", display: "flex", justifyContent: "center" }}>
							<div>
								<div id='streak' className='font-bold leading-snug tracking-tight mb-1'>
									<PieChart completed={completedHabits} missed={missedHabits} />
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
