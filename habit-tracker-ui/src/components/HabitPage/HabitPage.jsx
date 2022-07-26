import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../services/apiClient";

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
    console.log(habits);
  }, []);

  return (
    <div className="gridSection">
      <div className="gridContent">
        <h1>Habits</h1>
      </div>
      <HabitGrid habits={habits} />
    </div>
  );
}
function HabitGrid({ habits }) {
  return (
    <div className="gridContent">
      {habits.map((habit) => {
        return <HabitCard habit={habit} />;
      })}
    </div>
  );
}

function HabitCard({ habit }) {
  return (
    <div className="habitCard">
      <div>
        <div>{habit.habit_name}</div>
        <div>{habit.frequency}</div>
        <div>{habit.period}</div>
        <div>{habit.start_date}</div>
        <div>{habit.end_date}</div>
      </div>
    </div>
  );
}