import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: "AIzaSyBg34nM3Q1W2478yMhM83np-p6erXvT_R8",
  authDomain: "star-war-project-api.firebaseapp.com",
  projectId: "star-war-project-api",
  storageBucket: "star-war-project-api.appspot.com",
  messagingSenderId: "437895845414",
  appId: "1:437895845414:web:b903561e6208dc36e738e7"
  */
  apiKey: "AIzaSyB_cFPaRPTYVGHogPQ4hbeAGAalmiclt40",
  authDomain: "star-war-project-api-2f3e8.firebaseapp.com",
  projectId: "star-war-project-api-2f3e8",
  storageBucket: "star-war-project-api-2f3e8.appspot.com",
  messagingSenderId: "122568732399",
  appId: "1:122568732399:web:cdaa3a20648f250b5ef51a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);