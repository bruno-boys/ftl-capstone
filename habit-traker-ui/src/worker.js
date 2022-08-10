console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received');
    self.registration.showNotification(data.title, {
        body: "Notified by HabitTraker!",
        icon: "src/images/ht-icon.png"
    });
});