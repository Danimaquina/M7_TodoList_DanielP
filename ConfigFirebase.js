// Importar las funciones necesarias de Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Importar Firestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYms6NKmkEIpcpep2TwEyGVu9N-efojlk",
  authDomain: "todolist-94ab1.firebaseapp.com",
  projectId: "todolist-94ab1",
  storageBucket: "todolist-94ab1.firebasestorage.app",
  messagingSenderId: "634550553175",
  appId: "1:634550553175:web:4e7b8f29685622fffa3112",
  measurementId: "G-GRGDY3QF7B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };  // Exportar la instancia de Firestore
