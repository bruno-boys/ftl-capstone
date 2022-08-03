import React from 'react';
import { useState, useEffect} from "react";
import apiClient from "../../services/apiClient";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Header from '../../partials/Header';
import HabitGrid from '../HabitPage/HabitPage';
import HabitForm from '../HabitForm/HabitForm';
import Modal from '../../utils/Modal'
import EditForm from '../EditForm/EditForm';
import './Dashboard.css'

function Dashboard() {

    const [habits, setHabits] = useState([]);
    const [errors, setErrors] = useState("")
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [form, setForm] = useState({
      habitName: "",
      startDate: "",
      endDate: "",
      frequency: "",
      period: "Per Day",
    });

    function getPrint(event) {
      console.log("day = ",event)
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

      useEffect(() => {
        console.log('habits = ',habits);
      }, [habits])

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className="flex-grow">
                <section className="bg-gradient-to-b from-gray-100 to-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                      <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                        <>
                          <div className="activity-page">

                              <div className='left'>
                                  {/* <Calendar onClickDay={getPrint}/> */}
                                  <div className="daily-habits">
                                  
                                  </div>
                              </div>

                              <div className='right'>
                                <div className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3" style={{marginLeft:"0px", marginBottom:"0.25rem"}}>
                                  <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">Create Habit</span>
                                </div>
                                <div className="activity-habits">
                                    <HabitGrid habits={habits} formModalOpen={formModalOpen} setFormModalOpen={setFormModalOpen} handleClose={closeModal}/>
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
                          </div>
                        </>

                      </div>
                    </div>
                </section>


            </main>

        </div>
    )
}

export default Dashboard;

