import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";

export default function HabitPage() {
  const [habits, setHabits] = useState([]);

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

  return (
    <div className="gridSection">
      <div className="gridContent">
        <h1 id='habit-header'>Habits</h1>
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
              <div>{habit.habit_name}</div>
              <div>{habit.frequency}</div>
              <div>{habit.period}</div>
              <div>{habit.start_date}</div>
              <div>{habit.end_date}</div>
            </div>
          </Link>
      </div>

  );
}
