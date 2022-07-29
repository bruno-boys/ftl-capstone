import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import './HabitDetailPage.css'


export default function HabitDetailPage() {
    //gets the habitId from the URL
    const { habitId } = useParams()
    const [habit, setHabit] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate()

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


    const deleteHabit = async () => {
        const {data, err} = await apiClient.deleteHabit(habitId);
        if (err) {setError(err)}
        if (data) {
            navigate('/habit')
            console.log(data)
        }

    }


    return (
        <> 
            <span className='detail-buttons'>
                <button className="edit-habit">
                    Edit
                </button>
                <button className="delete-habit" onClick={deleteHabit}>
                    Delete
                </button>
            </span>
            <div className="habit-detail-page">
                <HabitDetailContainer habit={habit} />
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
    const periodLabel = getPeriod(habit.period)

    function getPeriod(period) {
        if (period == 'daily') {return "Every day"}
        else if (period == 'weekly') {return "Every week"}
        else if (period == 'monthly') {return "Every month"}
        else {return "Every year"}
    }

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