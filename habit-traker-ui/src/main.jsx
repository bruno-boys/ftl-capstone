import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


function send(habitName, hour, minutes) {
  console.log('made it to line 48 for notifications!')
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDate();
  const etaMs = new Date(year, month, day, hour, minutes).getTime() - Date.now();
  console.log('made it to line 55 for notifications!')
  if (etaMs >= 0) {
    setTimeout(() => createNotification(habitName), etaMs);    
  }
}

function createNotification(habitName) {
  if (Notification.permission == "granted") {
    const notification = new Notification('Time to Log Your Habit!', {
      body: `This is a reminder to log your ${habitName} habit.`,
      icon: "src/images/ht-icon.png"
    });
    notification.onclick = (e) => {
      window.location.href = "http://localhost:5173/activity";
    }
  }
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App send={send}/>
    </Router>
  </React.StrictMode>
);
