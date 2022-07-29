import "./EditForm.css";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditForm() {
  const { habitId } = useParams();
  const [habit, setHabit] = useState({});
  const [error, setError] = useState("");
  const [form, setForm] = useState({})
  const navigate = useNavigate();
  const PeriodOptions = [
    { key: 1, label: "daily", value: "daily" },
    { key: 2, label: "weekly", value: "weekly" },
    { key: 3, label: "monthly", value: "monthly" },
    { key: 4, label: "annually", value: "annually" },
  ];

  useEffect(() => {
    const getHabitById = async () => {
      const { data, err } = await apiClient.fetchHabitById(habitId);
      if (err) {
        setError(err);
      }
      if (data) {
        setHabit(data);

      }
    };
    getHabitById()
  }, []);

 
    

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
  setForm({
    id : habitId,
    habitName: habit.habit_name,
    startDate: formatDate(habit.start_date),
    endDate : formatDate(habit.end_date),
    frequency: habit.frequency,
    period: habit.period
  })
}, [habit])

  const handleOnInputChange = (event) => {

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  }

  console.log("form", form);

  const handleOnSubmit = async (event) => {

    event.preventDefault();
    const { data, error } = await apiClient.editHabit(form)
    navigate("/activity");
  }

  const cancel = async (event) => {
    event.preventDefault();
    navigate('/activity')
  }

  return (
    <div className="habit-form">
      <div className="card">
        <h2> Add A Habit </h2>

        <div className="form">
          <div className="input-field">
            <label htmlFor="habitName"> Habit Name</label>
            <input
              type="text"
              name="habitName"
              placeholder="Habit Name"
              value={form.habitName}
                onChange={handleOnInputChange}
            />
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="startDate"> Start Date </label>
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={formatDate(form.startDate)}
                onChange={handleOnInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="endDate"> End Date</label>
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={formatDate(form.endDate)}
                onChange={handleOnInputChange}
              />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="frequency">Frequency</label>
            <input
              type="number"
              name="frequency"
              placeholder="Frequency"
              value={form.frequency}
                onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="Period">Period</label>
            <select
              name="period"
              value={form.period}
                onChange={handleOnInputChange}
            >
              {PeriodOptions.map((period) => (
                <option key={period.key} value={period.label}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          <div className="btn">
            <button id="cancel-btn" onClick={cancel}>Cancel</button>
            <button onClick={handleOnSubmit}> Update Habit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
