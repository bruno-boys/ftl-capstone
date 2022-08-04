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
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [errors, setErrors] = useState("")
  const [form, setForm] = useState({
    habitName: "",
    startDate: "",
    endDate: "",
    frequency: "",
    period: "Per Day",
  });
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

  const closeModal = () => {
    setVideoModalOpen(false); 
    setForm({
      habitName: "",
      startDate: "",
      frequency: "",
      period: "Per Day",
    });
    window.location.reload();
  }

  return (


    
    <div className="habit-page">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="hp-top">
                <h1 className="hp-title">All Habits</h1>
                <div id="hp-create-btn-wrapper" className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3" style={{marginRight:"20px", marginBottom:"0.25rem"}}>
                  <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">Create Habit</span>
                </div>
              </div>
              <HabitGrid habits={habits} errors = {errors} setErrors = {setErrors} /> 
            </div>
          </div>
          {/* Modal */}
          <Modal id="create-habit-modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={closeModal}>
            <div className="relative pb-9/16">
              <div className="create-habit">
                <HabitForm form={form} setForm={setForm} handleClose={closeModal}/>
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
      {habits.map((habit, idx) => {
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

  const updateLog = async (event) => {
    event.preventDefault();
    const { data, error } = await apiClient.logHabit({habitId: habit.id});
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
