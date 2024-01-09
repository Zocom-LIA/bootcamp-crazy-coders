import { AppRoutes } from '@zocom/router';
import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebase from 'firebase/app';
import 'firebase/messaging';
import firebaseConfig from '../firebaseConfig.ts'

export const app = firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  useEffect(() => {
    const messaging = getMessaging(app);

    // Handle messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      // Handle the message as needed
    });
  }, []);
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
export default App;