import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./EditForm.css"

export default function EditForm({ habitId, handleClose }) {

    const [habit, setHabit] = useState({})
    const [error, setError] = useState("")
    const [form, setForm] = useState({})
    const PeriodOptions = [
        { key: 1, label: "Per Day", value: "Per Day" },
        { key: 2, label: "Per Week", value: "Per Week" },
        { key: 3, label: "Per Month", value: "Per Month" },
        ];

    useEffect(() => {
        const getHabitById = async () => {
            const { data, err } = await apiClient.fetchHabitById(habitId);
            if (err) {setError(err);}
            if (data) {setHabit(data);}
        };
        getHabitById()
        }, []);
        
        const formatDate = (date) => {
            console.log("date clicked", date)
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + (d.getDate()),
                year = d.getFullYear();
            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            return [year, month, day].join("-");
            }
            const getEndDate = (date, period) => {

                if (period == "Per Day") {
                  let endDate = new Date(date)
                  console.log("end date after reset", endDate)
                  endDate.setDate(endDate.getDate() + 1);
                  console.log("date return after function", endDate)
                  return endDate
                }
            
                if (period == "Per Week") {
                  let endDate = new Date(date)
                  console.log("end date after reset", endDate)
                  endDate.setDate(endDate.getDate() + 7);
                  console.log("date return after function", endDate)
                  return endDate
                }
            
                if (period == "Per Month") {
                  let endDate = new Date(date)
                  const daysInNextMonth = getDaysInNextMonth(endDate)
                  if ((endDate.getDate() > 28) && (getDaysInNextMonth(endDate) < endDate.getDate())){
        
                    endDate.setDate(getDaysInNextMonth(endDate))
                    endDate.setMonth(endDate.getMonth() + 1)
                    return endDate
                  }
        
                  else{
                    endDate.setMonth(endDate.getMonth() + 1)
                    return endDate
                  }
        
        
                }
              };
        
              const getDaysInNextMonth = (date) =>{
        
                const newDate = new Date(date)
                newDate.setMonth(newDate.getMonth() + 1)
                const nextMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
            
                return nextMonth.getDate()
            
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
        event.preventDefault();
        let targetValue = event.target.value
        if (event.target.name == "startDate" || event.target.name == "endDate"){
            console.log("date change here")
            targetValue = formatDate(event.target.value)
        }
        setForm((f) => ({ ...f, [event.target.name]: targetValue }));
        };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const tempEndDate =  getEndDate(form.startDate, form.period)
        console.log("end date after function", tempEndDate)
        const tempObj = {tempStartDate : form.startDate, tempEndDate : tempEndDate}
        const {data, error} = await apiClient.editHabit({...form, ...tempObj})
        window.location.reload();
    };

    return (
        <div>
            <h2>Edit Habit</h2>

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

                <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">End Date<span className="text-red-600">*</span></label>
                    <input name="endDate" type="date" value={form.endDate} className="form-input w-full text-gray-800" onChange={handleOnInputChange} required />
                </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnSubmit}>Edit Habit</button>
                    </div>
                </div>
            </form>

        </div>
    )

    }