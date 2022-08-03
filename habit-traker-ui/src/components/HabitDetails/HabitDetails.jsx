import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';


export default function HabitDetails({ habitId }) {

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

    const deleteHabit = async () => {
        const {data, err} = await apiClient.deleteHabit(habitId);
        if (err) {setError(err)}
        if (data) {
            navigate('/activity')
        }
    }


    return (
        <div className="habit-detail">
            Habit Detail
        </div>

    )
}