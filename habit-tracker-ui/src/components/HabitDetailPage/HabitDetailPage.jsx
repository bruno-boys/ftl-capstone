import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import './HabitDetailPage.css'


export default function HabitDetailPage() {
    //gets the habitId from the URL
    const { habitId } = useParams()
    const [habit, setHabit] = useState({})
    const [error, setError] = useState("")

    useEffect(() => {
        const getHabitById = async () => {
            const {data, err} = await apiClient.fetchHabitById(habitId);
            if (err) {setError(err)}
            if (data) {
                setHabit(data);
            }
        }
        getHabitById();
    }, [])

    return (
        <> 
            <span className='buttons'>
                <button className="edit-habit">
                    Edit
                </button>
                <button className="delete-habit">
                    Delete
                </button>
            </span>
            <div className="habit-detail-page">
                <HabitDetailContainer habit={habit}/>
            </div>
        </>
    )
}


function HabitDetailContainer({ habit }) {

    const options = {  
        year: "numeric", month: "short",  
        day: "numeric"  
    };  

    const startDate = new Date(habit.start_date).toLocaleDateString("en-us", options)
    const endDate = new Date(habit.end_date).toLocaleDateString("en-us", options)

    function getPeriod(period) {
        if (period == 'daily') {return "Every day"}
        else if (period == 'weekly') {return "Every week"}
        else if (period == 'monthly') {return "Every month"}
        else {return "Every year"}
    }

    const periodLabel = getPeriod(habit.period)


    return (
        <div className="habit-detail-container">
            <div className="habit-details">
                <div className="habit-name">{habit.habit_name}</div>
                <div className="periodLabel">{periodLabel}</div>
                {/* <div className="habit-period">{habit.period}</div> */}
                <div className="habit-frequency">{habit.frequency} times {habit.period}</div>
                <div className="habit-start-date">{startDate}</div>
                <div className="habit-end-date">{endDate}</div>
            </div>
        </div>
    )
}