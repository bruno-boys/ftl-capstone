import './Activity.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HabitGrid from '../HabitPage/HabitPage';
import Register from '../Register/Register';

export default function Activity({isAuthenticated}){

    function getPrint(event) {
        console.log("day = ",event)
    }

    const [habits, setHabits] = useState([]);
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
  
    const createHabit = (event) => {
      event.preventDefault();
      navigate("/habit-form");
    };

    const activity = isAuthenticated ?
    <>
    <div>
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
        </div>
    </>
    :
    <>
    <div>
     <Register />
    </div>
    </>
  

    return (

      activity
        
    )
}