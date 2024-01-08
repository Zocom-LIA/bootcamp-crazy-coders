import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './reduxstore/store.ts'
import firebase from 'firebase/app';
import 'firebase/messaging';
import firebaseConfig from '../firebaseConfig.ts'

export const app = firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
