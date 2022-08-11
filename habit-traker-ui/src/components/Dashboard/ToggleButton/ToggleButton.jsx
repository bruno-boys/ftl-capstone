import React, { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';
import './ToggleButton.css'

export default function ToggleButton({ buddy }) {

  const label = "Buddy View"

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

    <div className="container">
      { buddy ? 
          localStorage.getItem("toggleOn") == "false" ?
              <div className="btn-sm text-white bg-gray-600 hover:bg-gray-700 ml-3" style={{marginLeft:"0px"}}>
                <span onClick={buddyToggleStatus}>Buddy View</span>
              </div>
              :
              <div className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3" style={{marginLeft:"0px"}}>
                <span onClick={buddyToggleStatus}>Buddy View</span>
              </div>
          :
          <div className="btn-sm text-white bg-gray-600 hover:bg-gray-700 ml-3" style={{marginLeft:"0px"}}>
            <span>Buddy View</span>
          </div>
      }
</div>
  );
}

