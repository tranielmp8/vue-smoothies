import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {serverTimestamp} from 'firebase/firestore'



// init firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()
const timestamp = serverTimestamp()

export { db, auth, timestamp }
