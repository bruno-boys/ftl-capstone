import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import "react-calendar/dist/Calendar.css";
import DashHabits from "../DashHabits/DashHabits";
import HabitForm from "../HabitForm/HabitForm";
import Modal from "../../utils/Modal";
import "./Dashboard.css";
import { LitElement, html } from "lit-element";
import "@material/mwc-icon/mwc-icon.js";
import { DateTime } from "luxon";
import axios from "axios";

function Dashboard({ send, buddy, setBuddy }) {
	const [habits, setHabits] = useState([]);
	const [filteredHabits, setFilteredHabits] = useState([]);
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		const getQuotes = async () => {
			await axios.get(`https://type.fit/api/quotes`).then((resp) => {
				setQuotes(resp.data);
			});
		};
		getQuotes();
	}, []);

	const randomNumber = Math.floor(Math.random() * 1643);
	const [reminderModalOpen, setReminderModalOpen] = useState(false);
	const [errors, setErrors] = useState();
	const [form, setForm] = useState({
		habitName: "",
		startDate: "",
		endDate: "",
		frequency: "",
		period: "Per Day",
	});
	const formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return [year, month, day].join("-");
	};
	const [datePicked, setDatePicked] = useState(formatDate(new Date()));

	async function askNotificationPermission() {
		return new Promise(function (resolve, reject) {
			const permissionResult = Notification.requestPermission(function (result) {
				resolve(result);
			});

			if (permissionResult) {
				permissionResult.then(resolve, reject);
			}
		}).then(function (permissionResult) {
			if (permissionResult !== "granted") {
				throw new Error("We weren't granted permission.");
			}
		});
	}

	const fetchRemindersList = async () => {
		const { data, error } = await apiClient.fetchRemindersList();
		if (error) {
			setErrors(error);
		}
		if (data?.reminders) {
			let reminderList = data.reminders;
			reminderList.map(async (reminder) => {
				const { data, error } = await apiClient.fetchHabitById(reminder.habit_id);
				if (data) {
					let habitName = data.habit_name;
					let hour = parseInt(reminder.time.slice(0, 2));
					let minutes = parseInt(reminder.time.slice(3));
					send(habitName, hour, minutes);
				}
			});
		}
	};

	function setDate() {
		setDatePicked(localStorage.getItem("datePicked"));
	}

	useEffect(() => {
		const getHabits = async () => {
			const { data, error } = await apiClient.fetchHabitList();
			if (error) {
				setErrors(error);
			}
			if (data?.habits) {
				setHabits(data.habits);
			}
		};

		const getBuddyHabits = async () => {
			const buddyId = parseInt(localStorage.getItem("buddyId"));
			const { data, error } = await apiClient.fetchBuddyHabits(buddyId);
			if (error) {
				setErrors(error);
			}
			if (data) {
				setBuddy(data);
			}
		};

		getHabits();
		getBuddyHabits();
		askNotificationPermission();
		fetchRemindersList();
	}, []);

	const closeModal = () => {
		setVideoModalOpen(false);
		setReminderModalOpen(false);
		setForm({
			habitName: "",
			startDate: "",
			frequency: "",
			period: "Per Day",
		});
		window.location.reload();
	};

	useEffect(() => {
		const filterHabits = (date) => {
			setFilteredHabits(
				habits.filter(
					(habit) =>
						new Date(formatDate(habit.start_date)).getTime() <= new Date(datePicked).getTime() &&
						new Date(habit.end_date).getTime() > new Date(datePicked).getTime()
				)
			);
		};

		filterHabits();
	}, [datePicked, habits]);

	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			{/*  Page content */}
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							<>
								{/* <DateCarousel /> */}
								<div className='date-slider'>
									<date-carousel on-week-change='onWeekChange($event)' on-day-pick='onDayPick($event)' onClick={setDate}></date-carousel>
								</div>
								{/* Page Content */}
								<div className='activity-page'>
									<div className='header-buttons'>
										<div className='create-habit-btn' style={{ maxWidth: "100%" }}>
											{localStorage.getItem("buddyView") == "false" ? (
												<div className='btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3' style={{ marginLeft: "0px" }}>
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
											) : (
												<></>
											)}
										</div>
									</div>

									<div className='habit-boxes'>
										<div className='left'>
											<div className='daily-habits-container'>
												<div className='daily-habits'>
													<div className='activity-habits'>
														<DashHabits
															habits={filteredHabits}
															formModalOpen={formModalOpen}
															setFormModalOpen={setFormModalOpen}
															handleClose={closeModal}
															buddy={buddy}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className='right'>
											<div className='daily-habits-container'>
												<div className='dashboard-stats'>
													<blockquote className='blockquote blockquote--quoted'>
														<p className='blockquote__text'>{quotes[randomNumber]?.text}</p>
														<p className='blockquote__text blockquote__text--author'>
															{!quotes[randomNumber]?.author ? "Unknown" : quotes[randomNumber]?.author}
														</p>
													</blockquote>
												</div>
											</div>
										</div>
									</div>

									{/* Modal */}
									<div className='create-modal'>
										<Modal id='create-habit-modal' ariaLabel='modal-headline' show={videoModalOpen} handleClose={closeModal}>
											<div className='relative pb-9/16'>
												<div className='create-habit'>
													<HabitForm form={form} setForm={setForm} handleClose={closeModal} />
												</div>
											</div>
										</Modal>
									</div>
								</div>
							</>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Dashboard;

export const FORMAT_YEAR_WEEK = "yyyy-c";
export const FORMAT_YEAR_MONTH_DAY = "yyyy-LL-dd";

/**
 * `date-carousel`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DateCarousel extends LitElement {
	// We have to list _days as a property otherwise change detection in the lit template doesn't work.
	static get properties() {
		return {
			_days: { type: Array },
		};
	}

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		var now = DateTime.local();

		this.weekInView = now.startOf("week");
		this.weekUnixValue = now.startOf("week").toFormat("X"); // unix timestamp in seconds
		this.datePicked = now.toFormat(FORMAT_YEAR_MONTH_DAY);
		this.dateUnixValue = now.toFormat("X"); // unix timestamp in seconds
		this._calculateDays();
	}

	_calculateHeaderText() {
		let firstDayOfWeek = this.weekInView;
		let lastDayOfWeek = this.weekInView.plus({ days: 6 });

		const firstDayOfWeekYear = parseInt(firstDayOfWeek.toFormat("yyyy"));
		const lastDayOfWeekYear = parseInt(lastDayOfWeek.toFormat("yyyy"));

		let headerText;
		if (firstDayOfWeekYear !== lastDayOfWeekYear) {
			// the week stradles a new year --- show year text in both strings
			headerText = `${firstDayOfWeek.toFormat("LLL dd yyyy")} - ${lastDayOfWeek.toFormat("LLL dd yyyy")}`;
		} else {
			// the week is in the same year --- only show the year at the end
			headerText = `${firstDayOfWeek.toFormat("LLL dd")} - ${lastDayOfWeek.toFormat("LLL dd yyyy")}`;
		}
		return headerText;
	}

	_calculateDays() {
		let days = [];
		let currentDayCount = 1;
		let currentDay = this.weekInView;

		this._headerText = this._calculateHeaderText();

		while (currentDayCount <= 7) {
			days.push({
				dayOfWeek: currentDay.toFormat("ccc"),
				dayOfMonth: currentDay.toFormat("d"),
				day: currentDay.toFormat("dd"),
				month: currentDay.toFormat("LL"),
				year: currentDay.toFormat("yyyy"),
				unix: currentDay.toFormat("X"),
				class: this.datePicked === currentDay.toFormat(FORMAT_YEAR_MONTH_DAY) ? "selected" : "",
			});
			currentDay = currentDay.plus({ days: 1 });
			currentDayCount++;
		}
		this._days = days;
	}

	_next() {
		this.weekInView = this.weekInView.plus({ weeks: 1 });
		this.weekUnixValue = this.weekInView.toFormat("X");
		this.datePicked = this.weekInView.toFormat(FORMAT_YEAR_MONTH_DAY);
		this.dateUnixValue = this.weekInView.toFormat("X");
		this._calculateDays();
		this.dispatchEvent(new CustomEvent("on-week-change"));
	}

	_back() {
		this.weekInView = this.weekInView.minus({ weeks: 1 });
		this.weekUnixValue = this.weekInView.toFormat("X");
		this.datePicked = this.weekInView.toFormat(FORMAT_YEAR_MONTH_DAY);
		this.dateUnixValue = this.weekInView.toFormat("X");
		this._calculateDays();
		this.dispatchEvent(new CustomEvent("on-week-change"));
	}

	_onDayPick(event) {
		const day = event.currentTarget.dataset.day;
		const month = event.currentTarget.dataset.month;
		const year = event.currentTarget.dataset.year;
		this.datePicked = `${year}-${month}-${day}`;
		this.dateUnixValue = event.currentTarget.dataset.unix;
		this._calculateDays();
		this.dispatchEvent(new CustomEvent("on-day-pick"));
		localStorage.setItem("datePicked", this.datePicked);
	}

	_today() {
		var now = DateTime.local();

		this.weekInView = now.startOf("week");
		this.datePicked = now.toFormat(FORMAT_YEAR_MONTH_DAY);
		this.weekUnixValue = now.startOf("week").toFormat("X");
		this.dateUnixValue = now.toFormat("X");
		this._calculateDays();
		this.dispatchEvent(new CustomEvent("on-day-pick"));
		localStorage.setItem("datePicked", this.datePicked);
	}

	render() {
		return html`
			<style>
				:host {
					display: block;
				}
				table {
					font-family: Arial, Helvetica, sans-serif;
					width: var(--date-carousel-table-width, 100%);
					font-size: var(--date-carousel-table-font-size, 1em);
					color: var(--date-carousel-table-color, #000);
				}
				#dc-title {
					display: flex;
					justify-content: center;
				}
				mwc-icon {
					font-size: var(--date-carousel-button-font-size, --date-carousel-table-font-size, 1em);
				}
				.month {
					font-size: var(--date-carousel-month-font-size, 1em);
					color: var(--date-carousel-month-color, #000);
				}
				.day-of-week {
					text-align: center;
				}
				.day-of-month {
					text-align: center;
				}
				.selected .day-of-month {
					background: var(--date-carousel-selected-background, #ccc);
					color: var(--date-carousel-selected-color, #000);
					border-radius: 15px;
				}
				td.button {
					white-space: nowrap;
					width: 1px;
				}
				.clickable {
					cursor: pointer;
				}
			</style>
			<table class="header">
				<tr>
					<td id="dc-title">
						<div class="month">${this._headerText}</div>
					</td>
					<td class="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 clickable button" @click="${this._today}">
						<button class="today">Today</button>
					</td>
				</tr>
			</table>
			<table class="days">
				<tr>
					<td class="clickable button" @click="${this._back}">
						<mwc-icon class="back">chevron_left</mwc-icon>
					</td>
					${this._days.map(
						(day) => html`
							<td
								@click="${this._onDayPick}"
								data-day="${day.day}"
								data-month="${day.month}"
								data-year="${day.year}"
								data-unix="${day.unix}"
								class="clickable day ${day.class}"
							>
								<div class="day-of-week">${day.dayOfWeek}</div>
								<div class="day-of-month">${day.dayOfMonth}</div>
							</td>
						`
					)}
					<td class="clickable button" @click="${this._next}">
						<mwc-icon class="forward">chevron_right</mwc-icon>
					</td>
				</tr>
			</table>
		`;
	}
}

window.customElements.define("date-carousel", DateCarousel);
