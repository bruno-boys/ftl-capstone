import "../HabitForm/HabitForm.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";
export default function HabitForm() {
  const PeriodOptions = [
    { key: 1, label: "Daily", value: "daily" },
    { key: 2, label: "Weekly", value: "weekly" },
    { key: 3, label: "Monthly", value: "monthly" },
    { key: 4, label: "Annually", value: "annually" },
  ];

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    habitName: "",
    startDate: "",
    endDate : "",
    frequency : "",
    period : ""
  });


  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };


  console.log("Form", form)

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const {data, error} = await apiClient.createHabit(form)
    if (error) { setErrors(error) }
    if (data?.me) {
      // apiClient.setToken(data.token)
      navigate('/habits')
    };
  };


  return (
    <div className="habit-form">
      <div className="card">
        <h2> Add A Habit </h2>

        <div className="form">
          <div className="input-field">
            <label htmlFor="habitName"> Habit Name</label>
            <input type="text" name="habitName" placeholder="Habit Name" value={form.habitName} onChange={handleOnInputChange}/>
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="startDate"> Start Date </label>
              <input type="date" name="startDate" placeholder="Start Date"  value={form.startDate} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
              <label htmlFor="endDate"> End Date</label>
              <input type="date" name="endDate" placeholder="End Date"  value={form.endDate} onChange={handleOnInputChange} />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="frequency">Frequency</label>
            <input type="number" name="frequency" placeholder="Frequency"  value={form.frequency} onChange={handleOnInputChange}/>
          </div>

          <div className="input-field">
            <label htmlFor="Period">Period</label>
            <select name="period"  value={form.period} onChange={handleOnInputChange}>
              {PeriodOptions.map((period) => (
                <option key={period.key} value={period.label}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          <div className="btn">
            <button onClick={handleOnSubmit}> Add Habit</button>
          </div>
        </div>
      </div>
    </div>
  );
}