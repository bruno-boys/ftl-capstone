import React from "react";
import {useEffect, useState} from "react"
import apiClient from "../services/apiClient";
import {useNavigate} from "react-router-dom"

export default function AddReminder({habitId , handleClose}) {
  const [checked, setChecked] = React.useState(false);
  const [remindTime, setRemindTime] = React.useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleClick = () => {
    setChecked(!checked);
  };

  const handleTimeChange = (event) => {
    setRemindTime(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    const {data, error} = await apiClient.createReminder({habitId, remindTime})
    if (error) {
      setError({message : "You already have a reminder set"})
    } else {
      location.reload()
    }


    console.log("remind time", remindTime)
    console.log("data", data)
    console.log("error", error)
    console.log("habitId",)
    
  }

  console.log("Remind time", remindTime)

  return (
    <div>
         {error.message && <span className="error" style={{color:"red",textAlign:"center",fontSize:"16px"}}>{error.message}</span>}
         <br/>

      <label>
        Would you like to be reminded daily?
        <br />
        <input
          name="reminder"
          type="checkbox"
          checked={checked}
          onClick={handleClick}
        />
        <br />
        {!checked ? (
          <></>
        ) : (
          <label for="reminder">
            {" "}
            Choose a time for your daily reminders
            <input type="time" onChange={handleTimeChange} required />
          </label>
        )}
      </label>
      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleOnSubmit}>Add Reminder</button>
    </div>
  );
}
