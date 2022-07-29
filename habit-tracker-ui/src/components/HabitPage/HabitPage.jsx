import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../services/apiClient";
import EditForm from "../EditForm/EditForm.jsx";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function HabitPage() {
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
      <HabitGrid habits={habits} />
    </div>
  );
}

export default function HabitGrid({ habits }) {
  return (
    <div className="gridContent">
      {habits.map((habit, idx) => {
        return <HabitCard key={idx} habit={habit} />;
      })}
    </div>
  );
}

function HabitCard({ habit }) {

  const updateLog = async (event) => {
    event.preventDefault();
    const { data, error } = await apiClient.logHabit({habitId: habit.id});
    if (error) {
      setErrors(error);
    }
    if (data?.habit) {
      console.log(data.habit.id);
    }
  }


  return (
    <div className="habitCard">
      <Link to={"/habit/" + habit.id}>
        <div className="top">
          <div className="habitName">{habit.habit_name}</div>
          <div className="completion">0/{habit.frequency}</div>
        </div>
      </Link>
      <div className="bottom">
        <div className="habitFrequency">
          {habit.frequency}/{habit.period}
        </div>
        <div className="buttons">
          <Link to={"/habit/edit/" + habit.id}>
            <button className="edit">Edit</button>
          </Link>
          <button className="log" onClick={updateLog}>Log</button>
        </div>
      </div>
    </div>
  );
}
