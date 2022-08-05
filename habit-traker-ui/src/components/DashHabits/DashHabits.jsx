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
  const [errors, setErrors] = useState()
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const [tab, setTab] = useState(1);
  console.log("habit in habit card", habit)
  let start_date = habit.temp_start_date
  let end_date = new Date(start_date)
  console.log("start_date", start_date)
  console.log("end date", end_date)
  


  let today = new Date()
  today.setHours(0,0,0,0)
  end_date.setHours(0,0,0,0)
  today.setDate(today.getDate())

  const setPeriodEndDate = (date, period) => {

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

  setPeriodEndDate(end_date, habit.period)
  const updateLog = async (event) => {
    event.preventDefault();
    

    if ( today.getTime() >= end_date.getTime()){
      const tempObj = {tempStartDate : today}
      const obj = {
        id : habit.id,
        habitName : habit.habit_name,
        frequency : habit.frequency,
        period : habit.period,
        startDate : habit.start_date,
        endDate : habit.end_date
      }
      const {data, error} = await apiClient.editHabit({...obj, ...tempObj})
      end_date = today
      setPeriodEndDate(end_date, habit.period)
      start_date = today

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
