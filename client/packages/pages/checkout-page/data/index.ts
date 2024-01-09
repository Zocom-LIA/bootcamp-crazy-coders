import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from '../../../../firebaseConfig';

type Order = {
  customerId?: string;
  orderId?: string;
  totalSum: number;
  selection: Cart;
};

type Cart = {
  count: number;
  name: string;
  totalPrice: number;
}[];

const initializeFirebase = async () => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  console.log(app);

  const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPIDKEY });

  // Set up the message handler
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);

    // Display a notification
    const notification = payload.notification;
    if (notification && notification.title) {
      const { title, body } = notification;
      const notificationOptions: NotificationOptions = {
        body,
      };

      // Check if the Notification API is supported
      if ('Notification' in window && Notification.permission === 'granted') {
        // Display the notification
        new Notification(title, notificationOptions);
      } else {
        // If the Notification API is not supported or permission is not granted,
        // you can use a fallback mechanism or ask for permission here.
        console.error('Notification not supported or permission not granted');
      }
    }
  });

  return token;
};

export const postOrder = async (order: Order) => {
  try {
    const token = await initializeFirebase();

    const response = await fetch(import.meta.env.VITE_API_ENDPOINT_POST_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({ order, token }), // Include the order and token in the request body
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
