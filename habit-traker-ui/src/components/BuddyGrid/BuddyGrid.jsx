import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./BuddyGrid.css"

export default function BuddyGrid ({ buddies, setBuddyModalOpen, handleClose }) {
    const removeBuddy = async (buddyId) => {
        await apiClient.removeBuddy(buddyId)
        window.location.reload();
    }

    console.log('buddies = ', buddies);
    return (
        <div className="flex flex-wrap -mx-3 mb-4">
            { buddies ? 
                <div className="w-full px-3">
                    {buddies?.map((buddy, idx) => {
                        return <BuddyCard key={idx} buddy={buddy} removeBuddy={removeBuddy}/> 
                    })}
                </div>
                :
                <div  className="w-full px-3" style={{display:"flex", justifyContent:"center", marginTop:"3rem",}}>
                    <h1>No Buddies Available</h1>
                </div>
            }
        </div>
    )
}

function BuddyCard({ buddy, removeBuddy }) {
    const [tab, setTab] = useState(1);

    return(
        <section className="relative">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
                    {/* Tabs buttons */}
                    <div className="mb-8 md:mb-0">
                        <a
                            id="habit-cards"
                            className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                            tab !== 1
                                ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                                : "bg-gray-200 border-transparent"
                            }`}
                            href="#0"
                            onClick={(e) => {
                            e.preventDefault();
                            setTab(1);
                            }}
                        >
                            <div id="buddy-card" className="card">
                                <img id="profile-img" src={buddy.profile_photo ? buddy.profile_photo : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" } />
                                <div className="font-bold leading-snug tracking-tight mb-1" style={{color:"black"}}>{buddy.first_name} {buddy.last_name}</div> 
                            </div>
                            <div className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" 
                                    style={{backgroundColor:"red"}} onClick={() => removeBuddy({id: buddy.id})}>
                                <span>Remove</span>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}
