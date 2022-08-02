import React from "react";
import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import "./HabitForm.css"

export default function HabitForm({ form, setForm, handleClose }) {

  const PeriodOptions = [
      { key: 1, label: "Per Day", value: "Per Day" },
      { key: 2, label: "Per Week", value: "Per Week" },
      { key: 3, label: "Per Month", value: "Per Month" },
    ];


  const handleOnInputChange = (event) => {
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const {data, error} = await apiClient.createHabit(form)
    // setVideoModalOpen(false);
    // navigate('/activity')
    handleClose();
  };

  return (
    <div>
        <h2>New Habit</h2>

        <form className="habit-form" onSubmit={handleOnSubmit}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Name<span className="text-red-600">*</span></label>
              <input name="habitName" type="text" value={form.habitName} className="form-input w-full text-gray-800" placeholder="Enter name of habit" onChange={handleOnInputChange} required />
            </div>
          </div>

          <div className="habit-goals">
      
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Frequency<span className="text-red-600">*</span></label>
                <input name="frequency" type="number" value={form.frequency} className="form-input w-full text-gray-800" onChange={handleOnInputChange} required />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Period<span className="text-red-600">*</span></label>
                <select name="period" type="text" value={form.period} className="form-input w-full text-gray-800" placeholder="Enter your first name" onChange={handleOnInputChange} required>
                  {
                    PeriodOptions.map((period) => (
                    <option key={period.key} value={period.label}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>    
                    
          </div>  

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Start Date<span className="text-red-600">*</span></label>
                <input name="startDate" type="date" value={form.startDate} className="form-input w-full text-gray-800" onChange={handleOnInputChange} required />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnSubmit}>Add Habit</button>
                </div>
              </div>
        </form>

    </div>
  )

}