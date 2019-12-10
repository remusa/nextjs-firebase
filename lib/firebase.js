import firebase from "firebase/app";
import 'firebase/firestore'

import { API_KEY,
AUTH_DOMAIN,
DATABASE_URL,
PROJECT_ID,
STORAGE_BUCKET,
MESSAGING_SENDER_ID,
APP_ID } from '../.env.js'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
}

const Firebase = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const firestore = Firebase.firestore()

// export default Firebase
