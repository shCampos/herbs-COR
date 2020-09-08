import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
}
firebase.initializeApp(firebaseConfig)

export async function postDescription(data) {
	await firebase.database().ref('descriptions/').push(data)
}

export async function getAllFamilies(setFamilies) {
	await firebase.database().ref('families/')
	.on('value', (dataSnapshot) => {
    setFamilies(dataSnapshot.val())
  })
}

export async function postNewFamily(family) {
	await firebase.database().ref('families/').push(family)
}