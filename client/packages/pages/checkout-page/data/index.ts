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
  if (Notification.permission === 'granted') {
    // The permission is currently granted. You can clear it by revoking it.
    Notification.requestPermission().then((newPermission) => {
      console.log('Notification permission revoked:', newPermission);
    });
  } else {
    // The permission is not granted.
    console.log('Notification permission is not granted.');
  }
  const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPIDKEY });

  // Set up the message handler
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);

      // Check if the Notification API is supported
      if ('Notification' in window && Notification.permission === 'granted') {
        // Display a notification
        const notification = payload.notification;
        if (notification && notification.title) {
          const { title, body } = notification;
          const notificationOptions: NotificationOptions = {
          body,
        };
      } else {
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
