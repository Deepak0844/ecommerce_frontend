import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZ_OS59HZOXidV9daR9toGnDEZhAoMN6k",
  authDomain: "ecommerce-d5ff7.firebaseapp.com",
  projectId: "ecommerce-d5ff7",
  storageBucket: "ecommerce-d5ff7.appspot.com",
  messagingSenderId: "547898538681",
  appId: "1:547898538681:web:7bb4e5d1033e21b3783968",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
