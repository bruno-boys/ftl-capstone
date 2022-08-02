import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Header from '../../partials/Header';
import HabitGrid from '../HabitPage/HabitPage';
import './Dashboard.css'

function Dashboard() {

    const [habits, setHabits] = useState([]);

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

      const createHabit = (event) => {
        event.preventDefault();
        navigate("/habit-form");
      };

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
         <h1 className='title'>Dashboard</h1>
         <div className="activity-page">
            <div className='left'>
                <Calendar onClickDay={getPrint}/>
                <div className="daily-habits">
                    habits for today
                </div>
            </div>
            <div className='right'>
                <button className="create-habit" onClick={createHabit}>Add Habit</button>
                <div className="activity-habits">
                    <HabitGrid habits={habits} />
                </div>
            </div>
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

