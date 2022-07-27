import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../services/apiClient";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


export default function HabitPage() {
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

  return (
    <div className="gridSection">
      <div className="gridContent">

        <div className="grid-label">
          <h1 className="text-label">Habits</h1>
          <button className="create-habit" onClick={createHabit}>
            {" "}
            Add Habit
          </button>
        </div>

      </div>
      <Link id='form-btn'to={'/habit-form'}>Add Habit</Link>
      <HabitGrid habits={habits} />
    </div>
  );
}


function HabitGrid({ habits }) {
  return (
    <div className="gridContent">
      {habits.map((habit, idx) => {
        return <HabitCard key={idx} habit={habit} /> 
      })}
    </div>
  );
}

function HabitCard({ habit }) {

  return (
    <div className="habitCard">
    <Link to={"/habit/" + habit.id}>
      <div>
        <div className="top">
          <div className="habitName">{habit.habit_name}</div>
          <div className="completion">0/{habit.frequency}</div>
        </div>
        <div className="bottom">
          <div className="habitFrequency">
            {habit.frequency}/{habit.period}
          </div>
          <div className="buttons">
            <button className="edit">Edit</button>
            <button className="log">Log</button>
          </div>
          </Link>
        </div>

      </div>

  );
}
