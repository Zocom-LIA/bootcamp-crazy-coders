import { AppRoutes } from '@zocom/router';
import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, onMessage } from 'firebase/messaging';
import 'firebase/messaging';
import firebaseConfig from '../firebaseConfig.ts'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

//export const app = initializeApp(firebaseConfig);()
const App: React.FC = () => {
  //useEffect(() => {
    //const messaging = getMessaging(app);
    // Handle messages when the app is in the foreground
    //onMessage(messaging, (payload) => {
    //  console.log('Message received:', payload);
      // Handle the message as needed
    //});
  //}, []);
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
export default App;

function onBackgroundMessageHandler(messaging: Messaging, arg1: (payload: any) => void) {
  throw new Error('Function not implemented.');
}
