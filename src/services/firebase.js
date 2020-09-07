const firebase = require('firebase/app')

require('firebase/database')

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDULUALMQA7hXa7pfgArN9u0QFd6tPEN_s",
	authDomain: "especies-pantanal.firebaseapp.com",
	databaseURL: "https://especies-pantanal.firebaseio.com",
	projectId: "especies-pantanal",
	storageBucket: "especies-pantanal.appspot.com",
	messagingSenderId: "201819029776",
	appId: "1:201819029776:web:ab0ffe3c0a2b33bb92e595"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export async function postDescription(data) {
	await firebase.database().ref('descriptions/').push(data)
	.then(()=>true)
	.catch(()=>false)
}