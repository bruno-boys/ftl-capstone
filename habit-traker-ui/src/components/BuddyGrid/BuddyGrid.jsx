import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./BuddyGrid.css"

export default function BuddyGrid ({ buddies, setBuddies }) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState();

    const removeBuddy = async (buddyId) => {
        await apiClient.removeBuddy(buddyId);
        window.location.reload();
    }

    const selectBuddy = async (buddyId) => {
        localStorage.setItem("buddyView", "true");
        const {data, error} = await apiClient.fetchBuddyHabits(buddyId);
        if (error) { setErrors(error) }
        if (data) { 
            setBuddies(data) 
            localStorage.setItem("buddyId", buddyId);
        }
        navigate('/activity')
    }

    console.log('buddies = ', buddies);
    return (
        <div id="buddy-list" className="flex flex-wrap -mx-3 mb-4">
            { buddies ? 
                <div className="gridContent">
                    {buddies?.map((buddy, idx) => {
                        return <BuddyCard key={idx} buddy={buddy} selectBuddy={selectBuddy} removeBuddy={removeBuddy}/> 
                    })}
                </div>
                :
                <div  className="gridContent" style={{display:"flex", justifyContent:"center", marginTop:"3rem",}}>
                    <h1>No Buddies Available</h1>
                </div>
            }
        </div>
    )
}

function BuddyCard({ buddy, removeBuddy, selectBuddy }) {
    const [tab, setTab] = useState(1);

    return(
           <a
            id="buddy-cards"
            className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
            tab !== 1
                ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                : "bg-gray-200 border-transparent"
            }`}
            style={{height:"20px"}}
            onClick={(e) => {
            e.preventDefault();
            setTab(1);
            }}
            >
                <div id="buddy-card" className="card" onClick={() => selectBuddy(buddy.id)}>
                    <img id="profile-img" src={buddy.profile_photo ? buddy.profile_photo : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" } />
                    <div className="font-bold leading-snug tracking-tight mb-1" style={{color:"black"}}>{buddy.first_name} {buddy.last_name}</div> 
                </div>
                <div className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" 
                        style={{backgroundColor:"red"}} onClick={() => removeBuddy({id: buddy.id})}>
                    <span>Remove</span>
                </div>
            </a>
    )
}
