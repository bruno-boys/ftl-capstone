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
            date = String(date)
            let d
            if (date.length > 10){
               d = new Date(date)
            }
            else {
               d = new Date(date.replace(/-/gi, "/"))
            }

            let month = "" + (d.getMonth() + 1)
            let day = "" + (d.getDate())
            let year = d.getFullYear()
            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            return [year, month, day].join("-");
            }

            const formattingDate = (date) => {
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
                  endDate.setDate(endDate.getDate() + 1);
                  return endDate
                }
            
                if (period == "Per Week") {
                  let endDate = new Date(date)
                  endDate.setDate(endDate.getDate() + 7);
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
            let targetValue = event.target.value
            let todaysDate = new Date()
            todaysDate = formatDate(todaysDate)
        
            if (event.target.name === "startDate"){
        
              if ((new Date(event.target.value)).getTime() < (new Date(todaysDate).getTime())){
                setError((e) => ({...e, startDate : "Start Date cannot be before today."}))
              }
              else{
                if ((new Date(event.target.value)).getTime() >= (new Date((form.endDate))).getTime()) {
                  setError((e) => ({ ...e, startDate: "Start Date must be be at least a day before the End date" }));
                } else {
                  setError((e) => ({ ...e, startDate: null }));
                }
              }
           
            }
        
            if (event.target.name == "endDate"){
              if ((new Date(form.startDate)).getTime() >= (new Date((event.target.value))).getTime()){
                setError((e) => ({ ...e, endDate: "End Date must be be at least a day after the Start Date" }));
              } else {
                setError((e) => ({ ...e, endDate: null }));
              }
            }
        
            if (event.target.name == "frequency"){
              if(event.target.value < 1){
                setError((e) => ({ ...e, frequency : "Frequency cannot be less than 1"}))
              }
              else{
                setError((e) => ({...e, frequency : null}))
              }
            }
           
            if (event.target.name == "startDate" || event.target.name == "endDate"){
                targetValue = formatDate(event.target.value)
            }
            setForm((f) => ({ ...f, [event.target.name]: targetValue }));
            };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const tempEndDate =  getEndDate(form.startDate, form.period)
        const tempObj = {tempStartDate : form.startDate, tempEndDate : tempEndDate}
        // setForm((f) => ({ ...f}))
        if (error.startDate || error.endDate) {
          setError((e) => ({ ...e, message: "Error with your start and end date" }))
        }
        else if (error.frequency){
          setError((e) => ({...e, message : "Error with your frequency"}))
        }
        else{
    
        const {data, error} = await apiClient.editHabit({...form, ...tempObj})
        window.location.reload();
        }
    };

    return (
        <div>
            <h2>Edit Habit</h2>

            <form className="habit-form" onSubmit={handleOnSubmit}>
            {error.message && <span className="error" style={{color:"red",fontSize:"13px"}}>{error.message}</span>}
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
            {error.frequency && <span className="error" style={{color:"red",fontSize:"13px"}}>{error.frequency}</span>} 
                <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Start Date<span className="text-red-600">*</span></label>
                    {error.startDate && <span className="error" style={{color:"red",fontSize:"13px"}}>{error.startDate}</span>}
                    <input name="startDate" type="date" value={form.startDate} className="form-input w-full text-gray-800" onChange={handleOnInputChange} required />
                </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">End Date<span className="text-red-600">*</span></label>
                    {error.endDate && <span className="error" style={{color:"red",fontSize:"13px"}}>{error.endDate}</span>}
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