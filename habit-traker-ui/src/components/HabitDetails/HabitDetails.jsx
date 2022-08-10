import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../partials/Header';
import Modal from '../../utils/Modal';
import EditForm from '../EditForm/EditForm';
import apiClient from '../../services/apiClient';
import Calendar from 'react-calendar';
import './HabitDetails.css'


export default function HabitDetails({}) {
    //gets the habitId from the URL
    const { habitId } = useParams()
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [habit, setHabit] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getHabitById = async () => {
            const {data, err} = await apiClient.fetchHabitById(habitId);
            if (err) {setError(err)}
            if (data) {setHabit(data);}
        }
        getHabitById();
    }, [])

    const deleteHabit = async () => {
        const {data, err} = await apiClient.deleteHabit(habitId);
        if (err) {setError(err)}
        if (data) {
            navigate('/activity')
        }
    }


    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <main className="flex-grow">
                <section className="bg-gradient-to-b from-gray-100 to-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                            <div className='detail-buttons'>
                                <h1>{habit.habit_name}</h1>
                                { localStorage.getItem("toggleOn") == "false" ? 

                                    <>
                                      <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormModalOpen(true); setVideoModalOpen(true)}} aria-controls="modal">Edit</button>
                                        <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={deleteHabit} style={{backgroundColor:"red"}}>Delete</button>
                                    </>
                                    :
                                    <></>
                                
                                }
                                
                            </div>
                            <div className="habit-detail-page">
                                <HabitDetailContainer habit={habit} />
                            </div>
                        </div> 
                         {/* Modal */}
                        <Modal id="habit-detail-modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => {setVideoModalOpen(false);}}>
                            <div className="relative pb-9/16">
                                <div className="create-habit">
                                    <EditForm habitId={habitId} />
                                </div>
                            </div>
                        </Modal>                       
                    </div>                        
                </section>                        
            </main>
        </div>

    )
}


function HabitDetailContainer({ habit }) {

    const options = {  
        year: "numeric", month: "short",  
        day: "numeric"  
    };  
    const startDate = new Date(habit.start_date).toLocaleDateString("en-us", options)
    const endDate = new Date(habit.end_date).toLocaleDateString("en-us", options)
    const periodLabel = getPeriod(habit.period)
    const [tab, setTab] = useState(1);

    function getPeriod(period) {
        if (period == 'daily') {return "Every day"}
        else if (period == 'weekly') {return "Every week"}
        else if (period == 'monthly') {return "Every month"}
        else {return "Every year"}
    }

    return (
        <div className="habit-detail-container">
            <div className="habit-details">
                <div className="left">
                    <div className="periodLabel">{periodLabel}</div>
                    <div className="habit-frequency">{habit.frequency} times {habit.period}</div>
                    <div className="mb-8 md:mb-0">
                        <a
                        className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                        onClick={(e) => { e.preventDefault(); setTab(1); }}
                        style={{width:"540px", marginTop:"1rem"}}
                        >
                            <div>
                                <div id="streak" className="font-bold leading-snug tracking-tight mb-1">Current Streak</div>
                            </div>
                        </a>
                        <div className="status-days">
                            <a
                            className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                            onClick={(e) => { e.preventDefault(); setTab(1); }}
                            style={{width:"170px", display:"flex", justifyContent:"center"}}
                            >
                                <div>
                                    <div id="streak" className="font-bold leading-snug tracking-tight mb-1">Complete</div>
                                </div>
                            </a>

                            <a
                            className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                            onClick={(e) => { e.preventDefault(); setTab(1); }}
                            style={{width:"170px", display:"flex", justifyContent:"center"}}
                            >
                                <div>
                                    <div id="streak" className="font-bold leading-snug tracking-tight mb-1">Missed</div>
                                </div>
                            </a>

                            <a
                            className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                            onClick={(e) => { e.preventDefault(); setTab(1); }}
                            style={{width:"170px", display:"flex", justifyContent:"center"}}
                            >
                                <div>
                                    <div id="streak" className="font-bold leading-snug tracking-tight mb-1">Total</div>
                                </div>
                            </a>
                        </div>
                        <Calendar />
                    </div>
                </div>
                <div className="right">
                <div className="mb-8 md:mb-0">
                    <a
                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                    onClick={(e) => { e.preventDefault(); setTab(1); }}
                    style={{width:"540px", height:"500px", marginTop:"4rem", marginLeft:"1rem", display:"flex", justifyContent:"center"}}
                    >
                        <div>
                            <div id="streak" className="font-bold leading-snug tracking-tight mb-1">Averages/Stats</div>
                        </div>
                    </a>
                </div>
                </div>
            </div>
        </div>
    )
}