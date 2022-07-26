import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';


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
        <div className="habit-detail-page">
            <HabitDetailContainer habit={habit}/>
        </div>
    )
}


function HabitDetailContainer({ habit }) {
    return (
        <div className="habit-detail-container">
            <div className="habit-details">
                <div className="habit-name">{habit.habit_name}</div>
                <div className="habit-period">{habit.period}</div>
                <div className="habit-frequency">{habit.frequency}</div>
                <div className="habit-start-date">{habit.start_date}</div>
                <div className="habit-end-date">{habit.end_date}</div>
            </div>
        </div>
    )
}