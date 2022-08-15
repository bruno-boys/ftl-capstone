import React from "react";
import { useEffect } from "react";
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

    const formatDate = (date) => {
      console.log("date clicked", date)
      var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + (d.getDate() + 1),
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
    if (event.target.name == "startDate" || event.target.name == "endDate"){
        console.log("date change here")
        targetValue = formatDate(event.target.value)
        console.log("target value", targetValue)
    }
    setForm((f) => ({ ...f, [event.target.name]: targetValue }));
    console.log("form", form)
    };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("forms start date", form.startDate)
    const tempEndDate =  getEndDate(form.startDate, form.period)
    console.log("end date after function", tempEndDate)
    const tempObj = {tempStartDate : form.startDate, tempEndDate : tempEndDate}
    // setForm((f) => ({ ...f}))
    const {data, error} = await apiClient.createHabit({...form, ...tempObj})
    console.log("data", data)
    console.log("error", error)
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

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">End Date<span className="text-red-600">*</span></label>
                <input name="endDate" type="date" value={form.endDate} className="form-input w-full text-gray-800" onChange={handleOnInputChange} required />
              </div>
            </div>

           <div>
            <label>
              Would you like to be reminded daily? 
              <br/>
              <input name="reminder" type="checkbox" checked={checked} onClick={handleClick} />
              <br/>
              { !checked ?
                <></> 
                 :  
                <label for="reminder"> Choose a time for your daily reminders
                  <input type="time" onChange={handleTimeChange} required/>
                </label> 
              }
            </label>
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