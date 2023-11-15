import { initializeApp, } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCvDpGhkDGgdpQNDegYZefNEm8YlBRE5dE",
    authDomain: "chat-db192.firebaseapp.com",
    databaseURL: "https://chat-db192-default-rtdb.firebaseio.com",
    projectId: "chat-db192",
    storageBucket: "chat-db192.appspot.com",
    messagingSenderId: "254893106683",
    appId: "1:254893106683:web:61aed319700f4e1412175e"
};
const app = initializeApp(firebaseConfig);

export { app }


