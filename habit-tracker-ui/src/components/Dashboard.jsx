import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import Header from '../partials/Header';

function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

             {/*  Site header */}
            <Header />

        </div>
    )
}

export default Dashboard;

