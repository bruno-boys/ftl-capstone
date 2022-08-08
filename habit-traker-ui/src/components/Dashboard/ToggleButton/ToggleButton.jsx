import React, { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';
import './ToggleButton.css'

export default function ToggleButton({ buddy, habits, setHabits }) {

  const label = "Buddy View"
  const [toggleOn, setToggleOn] = useState(false)

  const buddyToggleStatus = () => { 
    console.log("toggleOn = ", localStorage.getItem("toggleOn"))
    if (localStorage.getItem("toggleOn") == "true"){ 
      localStorage.setItem("toggleOn", "false");
    }
    else { 
      localStorage.setItem("toggleOn", "true");
    }
    window.location.reload();
  }

  useEffect(() => {
    if (!localStorage.getItem("toggleOn")){
      localStorage.setItem("toggleOn", "false")
    }
  }, [])


  return (
    // <div className="container">
    //   {label}{" "}
    //   <div className="toggle-switch" >
    //     <input type="checkbox" className="checkbox" 
    //            name={label} id={label} disabled={buddy == undefined} onClick={buddyToggleStatus} />
    //     <label className="label" htmlFor={label} >
    //     <div className='off'>
    //             <span className="buddy-off" />
    //             <span className="switch" />
    //           </div>
    //     </label>
    //   </div>
    // </div>
    <div className="container">
      { localStorage.getItem("toggleOn") == "false" ?
          <div className="btn-sm text-white bg-gray-600 hover:bg-gray-700 ml-3" >
            <span onClick={buddyToggleStatus}>Buddy View</span>
          </div>
          :
          <div className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3" >
            <span onClick={buddyToggleStatus}>Buddy View</span>
          </div>
      }
</div>
  );
}

