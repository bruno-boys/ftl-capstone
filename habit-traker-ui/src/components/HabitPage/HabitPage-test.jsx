import "./HabitPage.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import apiClient from "../../services/apiClient";
// import EditForm from "../EditForm/EditForm.jsx";
import Modal from "../../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HabitDetails from "../HabitDetails/HabitDetails";


function HabitPage() {

  const [habits, setHabits] = useState([]);
  const [errors, setErrors] = useState("")

  const navigate = useNavigate();

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
  getHabits();
}, []);


  return (
    <div className="gridSection">
      <div className="gridContent">
      </div>
      <HabitGrid habits={habits} />
    </div>
  );
}

export default function HabitGrid({ habits }) {


  return (
    <div className="gridContent">
      {habits.map((habit, idx) => {
        return <HabitCard key={idx} habit={habit} />;
      })}
    </div>
  );
}



function HabitCard({ habit }) {

  const [logCount, setLogCount] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const [tab, setTab] = useState(1);

  const updateLog = async (event) => {
    event.preventDefault();
    const { data, error } = await apiClient.logHabit({habitId: habit.id});
    console.log("data = ", habit.id)
    if (error) {
      setErrors(error);
    }
    fetchLogCount()
  }


  const fetchLogCount = async () => {
    const logObj = {
      habitId: habit.id,
      startTime: habit.start_date,
      endTime: habit.end_date
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

  useEffect(() => {
    console.log(habit)
    fetchLogCount()
  }, [])


  return (

    <div className="habit-card">

      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">

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
                      <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
                        <div className="font-bold leading-snug tracking-tight mb-1">{habit.habit_name}</div>
                      </span>
                      <div className="bottom">
                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
                        { 
                          logCount >= habit.frequency ? 

                          <div className="text-gray-600" style={{color: "green", width:"100%"}}>{logCount}/{habit.frequency} Times {habit.period}</div>
                          :
                          <div className="text-gray-600">{logCount}/{habit.frequency} {habit.period}</div>
                        }
                        </span>
                        <div className="buttons">
                          <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">Edit</button>
                          <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={updateLog}>Log</button>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
               {/* Modal */}
               <Modal id="habit-detail-modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => {setVideoModalOpen(false);}}>
                  <div className="relative pb-9/16">
                    <div className="hab-detail">
                      <HabitDetails habitId={habit.id} />
                    </div>
                  </div>
                </Modal>
            </div>
          </div >
        </div >
      </section >
    </div>
  )
}
