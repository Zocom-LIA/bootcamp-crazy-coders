importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBjFV-wnZ_n3isPbC5695Uk6lqr4tvZUcg",
  authDomain: "yygs-crazy-coders.firebaseapp.com",
  projectId: "yygs-crazy-coders",
  storageBucket: "yygs-crazy-coders.appspot.com",
  messagingSenderId: "184821646486",
  appId: "1:184821646486:web:1857f37b26098c72352eb7"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
  
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };
    Notification.onBackgroundMessage
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
