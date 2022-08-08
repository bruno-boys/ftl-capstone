import React, { useEffect, useState } from 'react';
import './ToggleButton.css'

export default function ToggleButton({ buddy }) {

  const label = "Buddy View"
  const [toggleOn, setToggleOn] = useState(false)

  const buddyToggleStatus = (event) => { 
    console.log("toggleOn = ", localStorage.getItem("toggleOn"))
    if (localStorage.getItem("toggleOn") == "true"){ localStorage.setItem("toggleOn", "false") }
    else { localStorage.setItem("toggleOn", "true") }
  }

  useEffect(() => {
    if (!localStorage.getItem("toggleOn")){
      localStorage.setItem("toggleOn", "false")
    }
  }, [])


  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch" >
        <input type="checkbox" className="checkbox" 
               name={label} id={label} disabled={buddy == undefined} onClick={buddyToggleStatus} />
        <label className="label" htmlFor={label} >
        <div className='off'>
                <span className="buddy-off" />
                <span className="switch" />
              </div>
          {/* { localStorage.getItem("toggleOn") == "false" ?
              <div className='off'>
                <span className="buddy-off" />
                <span className="switch" />
              </div>
              :
              <div className='on'>
                <span className="buddy-on" />
                <span className="switch" />
              </div>
          } */}
          {/* <span className="buddy-off" /> */}
        </label>
      </div>
    </div>
  );
}
