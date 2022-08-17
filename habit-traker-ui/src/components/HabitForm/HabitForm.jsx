import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./HabitForm.css"

export default function HabitForm({ form, setForm, handleClose }) {

  const [checked, setChecked] = React.useState(false);
  const [remindTime, setRemindTime] = React.useState("")
  const handleClick = () => {
    setChecked(!checked)
  }

  const handleTimeChange = (event) => {
    console.log(event.target.val)
    setRemindTime(event.target.value)
    console.log("remindTime", remindTime)
  }

  const PeriodOptions = [
      { key: 1, label: "Per Day", value: "Per Day" },
      { key: 2, label: "Per Week", value: "Per Week" },
      { key: 3, label: "Per Month", value: "Per Month" },
    ];
  const [error, setError] = useState("")
  const formatDate = (date) => {
    console.log("date clicked", date)
    date = String(date)
    let d
    if (date.length > 10){
      console.log("is dates length greater than 10?")
       d = new Date(date)
    }
    else {
      console.log("dates length less than 10?")
       d = new Date(date.replace(/-/gi, "/"))
    }
    
    console.log("d created out of date", d)
    let month = "" + (d.getMonth() + 1)
    console.log("month",month)
    let day = "" + (d.getDate())
    console.log("day", day)
    let year = d.getFullYear()
    console.log("year ", year)
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log("this will be returned", [year, month, day].join("-"))
    return [year, month, day].join("-");
    }

      const formattingDate = (date) => {
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

  const handleOnInputChange = (event) => {
    let targetValue = event.target.value
    let todaysDate = new Date()
    todaysDate = formatDate(todaysDate)
    console.log("todays date before function", todaysDate)

    if (event.target.name === "startDate"){

      console.log("is start date really before today?", (new Date(event.target.value)).getTime() < (new Date(todaysDate).getTime())) 
      console.log("event target", event.target.value)
      console.log("todays date", todaysDate)
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
      console.log("start date on form", form.startDate)
      console.log("end date on form", form.endDate)
      console.log("is this true?", (new Date(form.startDate)).getTime() >= (new Date((event.target.value))).getTime())
      if ((new Date(form.startDate)).getTime() >= (new Date((event.target.value))).getTime()){
        console.log("we are setting the errors end date")
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
        console.log("date change here")
        targetValue = formatDate(event.target.value)
        console.log("target value", targetValue)
    }
    setForm((f) => ({ ...f, [event.target.name]: targetValue }));
    console.log("form", form)
    };
  console.log("error from form", error)

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("forms start date", form.startDate)
    const tempEndDate =  getEndDate(form.startDate, form.period)
    console.log("end date after function", tempEndDate)
    const tempObj = {tempStartDate : form.startDate, tempEndDate : tempEndDate}
    // setForm((f) => ({ ...f}))
    if (error.startDate || error.endDate) {
      setError((e) => ({ ...e, message: "Error with your start and end date" }))
    }
    else if (error.frequency){
      setError((e) => ({...e, message : "Error with your frequency"}))
    }
    else{

      const {data, error} = await apiClient.createHabit({...form, ...tempObj})
      if (error) {setError(error?.data?.error)}
      handleClose();

    }
 
  };

  return (
    <div>
        <h2 id="title-hf">New Habit</h2>

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
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnSubmit}>Add Habit</button>
                </div>
            </div>

            <div> 

            </div>
        </form>

    </div>
  )

}