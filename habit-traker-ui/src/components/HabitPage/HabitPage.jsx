import "./HabitPage.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import apiClient from "../../services/apiClient";
import EditForm from "../EditForm/EditForm";
import Modal from "../../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from '../../partials/Header'
import HabitForm from "../HabitForm/HabitForm";

export default function HabitPage() {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([])
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
  const [duration, setDuration] = useState("All Habits")

  const durationOptions = [
    { key: 1, label: "Past Habits", value: "Past Habits" },
    { key: 2, label: "Current Habits", value: "Current Habits" },
    { key: 3, label: "Future Habits", value: "Future Habits" },
    { key : 4, label : "All Habits", value : "All Habits"}
    ]


  useEffect(() => {
    const getHabits = async () => {
      const { data, error } = await apiClient.fetchHabitList();
      if (error) {
        setErrors(error);
      }
      if (data?.habits) {
        setHabits(data.habits);
        setFilteredHabits(data.habits)
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

  const handleOnInputChange = (event) =>{
    

    setDuration(event.target.value)
    // setHabits(habits.filter(habit => habit.end_date))
  } 

  useEffect(() => {

    let today = new Date();

    if (duration == "Past Habits"){
      console.log("selected past habits")
      setFilteredHabits(habits.filter(habit => new Date(habit.end_date).getTime() < today.getTime()))
    }
    if (duration == "Current Habits"){
      console.log("clicked current habits")
      setFilteredHabits(habits.filter(habit => today.getTime() >= new Date(habit.start_date).getTime() && today.getTime() < new Date(habit.end_date).getTime()))
    }
    if (duration == "Future Habits"){
      setFilteredHabits(habits.filter(habit => new Date(habit.start_date).getTime() > today.getTime()))
    }
    if (duration == "All Habits"){
      setFilteredHabits(habits)
    }

  }, [duration])

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
        return <HabitCard key={idx} habit={habit}  formModalOpen={formModalOpen} setFormModalOpen={setFormModalOpen} handleClose={handleClose} />;
      })}
    </div>
  );
}


function HabitCard({ habit, formModalOpen, setFormModalOpen, handleClose }) {

  const [logCount, setLogCount] = useState(0);
  const [errors, setErrors] = useState()
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const navigate = useNavigate();

   const [tab, setTab] = useState(1);
  console.log("habit in habit card", habit)
  let start_date = new Date(habit.temp_start_date)
  let end_date = new Date(start_date)
  console.log("start_date", start_date)
  console.log("end date", end_date)
  


  let today = new Date()
  today.setHours(0,0,0,0)
  end_date.setHours(0,0,0,0)
  today.setDate(today.getDate() + 1000)

  const getEndDate = (date, period) => {

    if (period == "Per Day") {

      date.setDate(date.getDate() + 1)
    }

    if (period == "Per Week"){
      date.setDate(date.getDate() +7)
    }

    if (period == "Per Month"){
      date.setMonth(date.getMonth() + 1)
    }


  }
  const setPeriodEndDate = (start, date, period) => {
    console.log("start", start)
    console.log("end", date)
    if (period == "Per Day") {
      date.setDate(date.getDate() + 1);
    }

    if (period == "Per Week") {
      let daysAfterEndDate = today.getTime() - date.getTime()
      daysAfterEndDate = (daysAfterEndDate)/ (1000 * 3600 * 24)
      console.log("days after end date", daysAfterEndDate)
      let daysAfterNextStartDate = daysAfterEndDate - (daysAfterEndDate % 7)
      console.log("days after next start date", daysAfterNextStartDate)
      start.setDate((new Date(date).getDate()) + daysAfterNextStartDate)
      date.setDate(date.getDate() + (7 + daysAfterNextStartDate));
      console.log("start date after functtion call", start)
      console.log("end date after functtion call", date)

    }

    if (period == "Per Month") {

    }

    
  };

  getEndDate(end_date, habit.period)
  const updateLog = async (event) => {
    event.preventDefault();
    if ( today.getTime() >= end_date.getTime()){
      
      const obj = {
        id : habit.id,
        habitName : habit.habit_name,
        frequency : habit.frequency,
        period : habit.period,
        startDate : habit.start_date,
        endDate : habit.end_date
      }
      setPeriodEndDate(start_date, end_date, habit.period)
      const tempObj = {tempStartDate : start_date}
      const {data, error} = await apiClient.editHabit({...obj, ...tempObj})

    }
    const anotherDay = new Date(end_date).toISOString()
    console.log("another day", anotherDay)
    
    const { data, error } = await apiClient.logHabit({id: habit.id, startDate : start_date, endDate : anotherDay})
    console.log("data form log count", data)
    if (error) {
      setErrors(error);
    }
    fetchLogCount()
    
  }


  const fetchLogCount = async () => {
    const anotherDay = new Date(end_date).toISOString()
    const anotherStart = new Date(start_date).toISOString()
    const logObj = {
      habitId: habit.id,
      startTime: anotherStart,
      endTime: anotherDay
    }
  
    const { data, error } = await apiClient.fetchLoggedHabitCount(logObj);
    if (error) {
      setErrors(error);
    }
    if (data?.logCount) {
      localStorage.setItem(`log_count_${habit.id}`, data.logCount.count)
      await setLogCount(localStorage.getItem(`log_count_${habit.id}`));
    }
  }
  const closeModal = async () => {
    window.location.reload();
    await setFormModalOpen(false);
    await setFormModalOpen(false)
  }

  const deleteHabit = async () => {
    const {data, err} = await apiClient.deleteHabit(habit.id);
    if (err) {setError(err)}
    if (data) {
    navigate('/habits')
    }
  }

  useEffect(() => {
    fetchLogCount()
  }, [])


  return (

    <div className="habit-card">

      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              {/* Tabs buttons */}
                <div className="mb-8 md:mb-0">
                  <a
                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                    href="#0"
                    onClick={(e) => { e.preventDefault(); setTab(1); }}
                  >
                    <div className="card" style={{width:"100%"}}>
                      <Link to={`/habit/${habit.id}`}>
                      <div className="top">
                        <div className="font-bold leading-snug tracking-tight mb-1" style={{width:"100%"}}>{habit.habit_name}</div>
                      <div className="buttons">
                        <button id="delete" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={deleteHabit}>Delete</button>
                      </div>
                      </div>
                      <div className="bottom">
                        { 
                          logCount >= habit.frequency ? 

                          <div className="text-gray-600" style={{color: "green", width:"100%"}}>{logCount}/{habit.frequency} Times {habit.period}</div>
                          :
                          <div className="text-gray-600">{logCount}/{habit.frequency} {habit.period}</div>
                        }
                        <div className="buttons">
                          <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormModalOpen(true); setVideoModalOpen(true)}} aria-controls="modal">Edit</button>
                          <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={updateLog}>Log</button>
                        </div>
                      </div>
                      </Link>
                    </div>
                  </a>
                </div>
               {/* Modal */}
               <Modal id="habit-detail-modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={handleClose}>
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
          </div >
      </section >
    </div>
  )
}
