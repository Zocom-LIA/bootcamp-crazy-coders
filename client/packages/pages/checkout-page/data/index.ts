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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log(app);
console.log(messaging);
const token = await getToken(messaging, {vapidKey: "BGOLvEEgih8BT-iYo8BNdU8ffHwtWyg7tPTUFtAWv8TNAmBU806vRvnrtRPkx1w0xc1OHprl3CltzRTUThg-row"});
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
       //Handle the message as needed
    });

export const postOrder = async (order: Order) => {
  const askForNotificationPermission = async () => {
    try {
      //const token = await getToken(messaging);
      console.log("TOKEN: ", token);
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
      console.error('Error requesting notification permission:', error);
    }
  };

  try {
    await askForNotificationPermission();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};