import "./HabitPage.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import apiClient from "../../services/apiClient";
import EditForm from "../EditForm/EditForm";
import Modal from "../../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../partials/Header";
import HabitForm from "../HabitForm/HabitForm";

export default function HabitPage() {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    habitName: "",
    startDate: "",
    endDate: "",
    frequency: "",
    period: "Per Day",
  });
  const navigate = useNavigate();
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
    getHabits();
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
    // setHabits(habits.filter(habit => habit.end_date))
  };

  useEffect(() => {
    let today = new Date();

    if (duration == "Past Habits") {

      setFilteredHabits(
        habits.filter(
          (habit) => new Date(habit.end_date).getTime() < today.getTime()
        )
      );
    }
    if (duration == "Current Habits") {
      setFilteredHabits(
        habits.filter(
          (habit) =>
            today.getTime() >= new Date(habit.start_date).getTime() &&
            today.getTime() < new Date(habit.end_date).getTime()
        )
      );
    }
    if (duration == "Future Habits") {
      setFilteredHabits(
        habits.filter(
          (habit) => new Date(habit.start_date).getTime() > today.getTime()
        )
      );
    }
    if (duration == "All Habits") {
      setFilteredHabits(habits);
    }
  }, [duration]);

  return (
    <div className="habit-page">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="duration"
                  >
                    Duration
                  </label>
                  <select
                    name="duration"
                    type="text"
                    value={duration}
                    className="form-input w-full text-gray-800"
                    onChange={handleOnInputChange}
                    required
                  >
                    {durationOptions.map((duration) => (
                      <option key={duration.key} value={duration.label}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="hp-top">
                <h1 className="hp-title">All Habits</h1>
                <div
                  id="hp-create-btn-wrapper"
                  className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3"
                  style={{ marginRight: "20px", marginBottom: "0.25rem" }}
                >
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setVideoModalOpen(true);
                    }}
                    aria-controls="modal"
                  >
                    Create Habit
                  </span>
                </div>
              </div>
              <HabitGrid
                setFormModalOpen={setFormModalOpen}
                habits={filteredHabits}
                errors={errors}
                setErrors={setErrors}
              />
            </div>
          </div>
          ``
          {/* Modal */}
          <Modal
            id="create-habit-modal"
            ariaLabel="modal-headline"
            show={videoModalOpen}
            handleClose={closeModal}
          >
            <div className="relative pb-9/16">
              <div className="create-habit">
                <HabitForm
                  form={form}
                  setForm={setForm}
                  handleClose={closeModal}
                />
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
    <div className="gridContent">
      {habits?.map((habit, idx) => {
        return (
          <HabitCard
            key={idx}
            habit={habit}
            formModalOpen={formModalOpen}
            setFormModalOpen={setFormModalOpen}
            handleClose={handleClose}
          />
        );
      })}
    </div>
  );
}

function HabitCard({ habit, formModalOpen, setFormModalOpen, handleClose }) {
  const [logCount, setLogCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [errors, setErrors] = useState();
  const [startDate, setStartDate] = useState(new Date(habit.temp_start_date))
  const [endDate, setEndDate] = useState(new Date(habit.temp_end_date))
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const [tab, setTab] = useState(1);
  // let start_date = new Date(habit.temp_start_date);
  // let end_date = new Date(start_date);

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() + 7);

  

  const formatDate = (date) => {

    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
    }
  const setPeriodEndDate = (start, date, period) => {
    if (period == "Per Day") {
      start.setFullYear(today.getFullYear())
      start.setMonth(today.getMonth())
      start.setDate(today.getDate())
      date.setFullYear(today.getFullYear())
      date.setMonth(today.getMonth())
      date.setDate(today.getDate() + 1)
      setEndDate(date)
      setStartDate(start)
    }

    if (period == "Per Week") {
      let daysAfterEndDate = today.getTime() - date.getTime();
      daysAfterEndDate = daysAfterEndDate / (1000 * 3600 * 24);
      let daysAfterNextStartDate = daysAfterEndDate - (daysAfterEndDate % 7);
      start.setDate(new Date(date).getDate() + daysAfterNextStartDate);
      date.setDate(date.getDate() + (7 + daysAfterNextStartDate));
      setEndDate(date)
      setStartDate(start)

    }

    if (period == "Per Month") {
    }
  };

  
  const updateLog = async (event) => {
    event.preventDefault();
    if (today.getTime() >= endDate.getTime()) {
      const obj = {
        id: habit.id,
        habitName: habit.habit_name,
        frequency: habit.frequency,
        period: habit.period,
        startDate: habit.start_date,
        endDate: habit.end_date,
      }
      fetchstreakCount()
      console.log("logCount here?", logCount)
      console.log("streak here?", streakCount)
      if ((logCount >= habit.frequency)){
        await apiClient.logProgress({habitId : habit.id, startDate : formatDate(startDate), endDate : formatDate(endDate), current_streak : (streakCount + 1)})
      }
      setPeriodEndDate(startDate, endDate, habit.period);
      const tempObj = { tempStartDate: formatDate(startDate), tempEndDate : formatDate(endDate) };
      const { data, error } = await apiClient.editHabit({ ...obj, ...tempObj })
      location.reload()
    }
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

    console.log("previous start date", previousStartDate)
    console.log("previous end date", previousEndDate)

    const logData = {
      habitId: habit.id,
      startDate: formatDate(previousStartDate),
      endDate: formatDate(previousEndDate),
    };

    const { data, error } = await apiClient.fetchStreakCount(logData);
    console.log("streak count returned from API", data.streakCount)
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
      setError(err);
    }
    if (data) {
      navigate("/habits");
    }
  };

  useEffect(() => {
    fetchLogCount();
  }, []);

  useEffect(() =>{
    fetchstreakCount()
  },[])

  return (
    <div className="habit-card">
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Content */}
          <div
            className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
            data-aos="fade-right"
          >
            {/* Tabs buttons */}
            <div className="mb-8 md:mb-0">
              <a
                className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                  tab !== 1
                    ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                    : "bg-gray-200 border-transparent"
                }`}
                href="#0"
                onClick={(e) => {
                  e.preventDefault();
                  setTab(1);
                }}
              >
                <div className="card" style={{ width: "100%" }}>
                  <Link to={`/habit/${habit.id}`}>
                    <div className="top">
                      <div
                        className="font-bold leading-snug tracking-tight mb-1"
                        style={{ width: "100%" }}
                      >
                        {habit.habit_name}
                        {streakCount}
                      </div>
                      <div className="buttons">
                        <button
                          id="delete"
                          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          onClick={deleteHabit}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="bottom">
                      {logCount >= habit.frequency ? (
                        <div
                          className="text-gray-600"
                          style={{ color: "green", width: "100%" }}
                        >
                          {logCount}/{habit.frequency} Times {habit.period}
                        </div>
                      ) : (
                        <div className="text-gray-600">
                          {logCount}/{habit.frequency} {habit.period}
                        </div>
                      )}
                      <div className="buttons">
                        <button
                          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormModalOpen(true);
                            setVideoModalOpen(true);
                          }}
                          aria-controls="modal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          onClick={updateLog}
                        >
                          Log
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </a>
            </div>
            {/* Modal */}
            <Modal
              id="habit-detail-modal"
              ariaLabel="modal-headline"
              show={videoModalOpen}
              handleClose={handleClose}
            >
              <div className="relative pb-9/16">
                <div className="create-habit">
                  <EditForm habitId={habit.id} />
                </div>
              </div>
            </Modal>

            {/* {
                  formModalOpen ?
                  <div className="relative pb-9/16">
                    <div className="create-habit">
                      <EditForm habitId={habit.id} />
                    </div>
                  </div>
                :
                  <div className="relative pb-9/16">
                    <div className="hab-detail">
                      <HabitDetails habitId={habit.id} />
                    </div>
                  </div>
                }
              </Modal> */}
          </div>
        </div>
      </section>
    </div>
  );
}
