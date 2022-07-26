import "./HabitPage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HabitPage() {
    const [habits, setHabits] = useState([]);

  useEffect(() => {});
  const getHabits = async () => {
    const data = await axios.get("localhost:3001/api/habits");
    console.log(data);
    // const { data } = await apiClient.getHabits();
    setHabits(data);
  };

  return (
    <div className="gridSection">
      <div className="gridContent">
        <h1>Habits</h1>
      </div>
      <div className="grid">
        {habits.map((habit) => {
            
        })}
      </div>
    </div>
  );
}
