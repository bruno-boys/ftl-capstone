import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import apiClient from './services/apiClient';

const publicVapidKey = "BGCM3ooo1OPVCeWRy0xKLPtiI3c9zqFmo4cUeJv7uu875oA3GEz3S5B3G5CrhisZ5s-udsRgsFj4e1jaP8btoi4";

// Check for service worker
if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

// setInterval(send, 5000);

// register the service worker, register push, send push
async function send() {
  // TODO: try making the scope apply to activity page
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('worker.js', {
    scope: '/'
  });
  console.log('Service Worker Registered...');

  // Register Push
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUnit8Array(publicVapidKey)
  });
   console.log('Push Registered...');

   // Send Push Notification
   console.log('Sending Push...');
  //  await fetch('/subscribe', {
  //   method: "POST",
  //   body: JSON.stringify(subscription),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  //  });
  await apiClient.subscribe(subscription)
   console.log('Push Sent');
}


function urlBase64ToUnit8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
