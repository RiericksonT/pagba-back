// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQkFiknLwyV8tyiuKvgi0TM_EP_t4uYA4',
  authDomain: 'pagba-fa1af.firebaseapp.com',
  projectId: 'pagba-fa1af',
  storageBucket: 'pagba-fa1af.appspot.com',
  messagingSenderId: '1071521921026',
  appId: '1:1071521921026:web:fbdda9a2dc679ea118cf1b',
};

// Initialize Firebase
export default function app() {
  initializeApp(firebaseConfig);
}
