const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASEURL,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APID
}
firebase.initializeApp(firebaseConfig)

export async function postDescription(data) {
	await firebase.database().ref('descriptions/').push(data)
	.then(()=>true)
	.catch(()=>false)
}







