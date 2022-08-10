import "./DashHabits.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import apiClient from "../../services/apiClient";
import EditForm from "../EditForm/EditForm";
import Modal from "../../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HabitDetails from "../HabitDetails/HabitDetails";


export default function DashHabits({ habits, formModalOpen, setFormModalOpen, handleClose }) {
  console.log("habits in dashhabits", habits)

  return (
    <div className="gridContent">
      {habits.map((habit, idx) => {
        return <DashHabitCard key={idx} habit={habit}  formModalOpen={formModalOpen} setFormModalOpen={setFormModalOpen} handleClose={handleClose} />;
      })}
    </div>
  );
}


function DashHabitCard({ habit, formModalOpen, setFormModalOpen, handleClose }) {

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
  today.setDate(today.getDate());

  

  const formatDate = (date) => {

    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + (d.getDate()),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
    }

  const formatLogProgressDate = (date) => {
    var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + (1),
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
      start.setMonth(start.getMonth() + 1)
      setStartDate(start)
      date.setMonth(date.getMonth() + 1)
      setEndDate(date)

    }
  };

  
  const updateLog = async (event) => {
    event.preventDefault();
    console.log("today", today)
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
        if (habit.period == "Per Month"){
          await apiClient.logProgress({habitId : habit.id, startDate : formatLogProgressDate(startDate), endDate : formatLogProgressDate(endDate), current_streak : (streakCount + 1)})
        }
        else{
          await apiClient.logProgress({habitId : habit.id, startDate : formatDate(startDate), endDate : formatDate(endDate), current_streak : (streakCount + 1)})
        }
        
      }
      setPeriodEndDate(startDate, endDate, habit.period);
      const tempObj = { tempStartDate: formatDate(startDate), tempEndDate : formatDate(endDate) };
      const { data, error } = await apiClient.editHabit({ ...obj, ...tempObj })
      location.reload()
    }
    console.log("end date", endDate)
    const anotherDay = new Date(endDate).toISOString();
    console.log("anotherDate", anotherDay)
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
    
    if (habit.period == "Per Month"){
      previousEndDate.setMonth(previousEndDate.getMonth() - 1)
      previousEndDate.setDate(1)
      previousStartDate.setMonth(previousStartDate.getMonth() - 1)
      previousStartDate.setDate(1)
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
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              {/* Tabs buttons */}
                <div className="mb-8 md:mb-0">
                  <a
                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                    href="#0"
                    onClick={(e) => { e.preventDefault(); setTab(1); }}
                  >
                    <div className="card" style={{width:"100%"}}>
                      <Link to={`/habit/${habit.id}`} state = {streakCount}>
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
