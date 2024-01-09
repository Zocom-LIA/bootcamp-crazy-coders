import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseConfig from '../../../../firebaseConfig';

type Order = {
  customerId?: string;
  totalSum: number;
  selection: Cart;
};

type Cart = {
  count: number;
  name: string;
  totalPrice: number;
}[];

export const postOrder = async (order: Order) => {
  const askForNotificationPermission = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      const token = await getToken(messaging);

      const response = await fetch(import.meta.env.VITE_API_ENDPOINT_POST_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({ order, token }), // Include the order and token in the request body
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  try {
    await askForNotificationPermission();
  } catch (error) {
    console.error(error);
  }
};