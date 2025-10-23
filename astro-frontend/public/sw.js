self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/church-logo.webp",
    image: data.image,
    data: {
      url: data.data?.url || "/", // store URL here to use on click
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Check if the URL is already open in a tab
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window/tab with the URL
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});
