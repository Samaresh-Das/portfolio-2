// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getDatabase, getApp } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6l3JtEOEe5PDtF3IGwEdOvvl1RIZnAd0",
  databaseURL:
    "https://portfolio-dashboard-cc129-default-rtdb.asia-southeast1.firebasedatabase.app/",
  authDomain: "portfolio-dashboard-cc129.firebaseapp.com",
  projectId: "portfolio-dashboard-cc129",
  storageBucket: "portfolio-dashboard-cc129.appspot.com",
  messagingSenderId: "349212429055",
  appId: "1:349212429055:web:f3d79e970f5e8df2a31aca",
};

const alreadyCreatedAps = getApps();

export const app =
  alreadyCreatedAps.length === 0
    ? initializeApp(firebaseConfig)
    : alreadyCreatedAps[0];
