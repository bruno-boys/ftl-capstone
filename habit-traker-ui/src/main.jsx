import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import apiClient from './services/apiClient';

const publicVapidKey = "BGCM3ooo1OPVCeWRy0xKLPtiI3c9zqFmo4cUeJv7uu875oA3GEz3S5B3G5CrhisZ5s-udsRgsFj4e1jaP8btoi4";


// Check for service worker
// if('serviceWorker' in navigator && Notification.permission == "granted") {
//   send().catch(err => console.error(err));
// }

//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

const etaMs = new Date(2022, 7, 12, 13, 30).getTime() - Date.now();

setTimeout(send, etaMs);

// register the service worker, register push, send push
async function send() {
  // TODO: try making the scope apply to activity page
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('src/worker.js', {
    scope: 'src/'
  });
  console.log('Service Worker Registered');

  // Register Push
  console.log('Registering Push...');
  const subscription = await register?.pushManager?.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
  });
   console.log('Push Registered');
   // Send Push Notification
   console.log('Sending Push');
   await apiClient.subscribe(subscription)
   console.log('Push Sent');
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
