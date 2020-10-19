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

export async function getAllFamilies(setFamilies) {
	await firebase.database().ref('plantae/families/')
	.on('value', (dataSnapshot) => {
    setFamilies(dataSnapshot.val())
  })
}

export async function postNewFamily(family) {
	await firebase.database().ref('plantae/families/').push(family)
}

export async function getFamilyByName(familyName, setCurrentFamily) {
	await firebase.database().ref('plantae/families/')
	.orderByChild('name')
	.equalTo(familyName)
	.on('value', (dataSnapshot) => {
		setCurrentFamily(dataSnapshot.val())
	})
}

export async function getFamilyByKey(familyKey, setCurrentFamily) {
	await firebase.database().ref('plantae/families/')
	.orderByKey()
	.equalTo(familyKey)
	.on('value', (dataSnapshot) => {
		setCurrentFamily(dataSnapshot.val())
	})
}

export async function getGenreByFamilyKey(familyKey, setGenus) {
	await firebase.database().ref('plantae/genres/')
	.orderByChild('familyKey')
	.equalTo(familyKey)
	.on('value', (dataSnapshot) => {
		setGenus(dataSnapshot.val())
	})
}

export async function getGenreByName(genreName, setCurrentGenre) {
	await firebase.database().ref('plantae/genres/')
	.orderByChild('name')
	.equalTo(genreName)
	.on('value', (dataSnapshot) => {
		setCurrentGenre(dataSnapshot.val())
	})
}

export async function postNewGenre(familyKey, newGenus) {
	await firebase.database().ref('plantae/genres/')
		.push({familyKey: familyKey, name: newGenus})
}

export async function getAllSpecies(setSpecies) {
	await firebase.database().ref('plantae/species/')
	.on('value', (dataSnapshot) => {
    setSpecies(dataSnapshot.val())
  })
}

export async function getSpeciesByGenre(genreKey) {

}

export async function postSpecieDescription(familyKey, genreKey, newSpecie) {
	await firebase.database().ref('plantae/species/')
	.push({
		familyKey: familyKey,
		genreKey: genreKey,
		...newSpecie
	})
}
