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

async function getFamilyKey(familyName) {
	let familyKey;
	await firebase.database().ref('families/')
	.orderByChild('name')
	.equalTo(familyName)
	.on('value', (dataSnapshot) => {
		familyKey = Object.keys(dataSnapshot.val())[0]
	})
	return familyKey
}

async function getGenusKey(familyKey, genus) {
	let genusKey;
	await firebase.database().ref('families/'+familyKey+'/genus')
	.orderByChild('name')
	.equalTo(genus)
	.on('value', (dataSnapshot) => {
		genusKey = Object.keys(dataSnapshot.val())[0]
	})
	return genusKey
}

export async function postDescription(familyName, genusName, newSpecie) {
	const familyKey = await getFamilyKey(familyName)
	const genusKey = await getGenusKey(familyKey, genusName)	
	await firebase.database().ref('families/'+familyKey+'/genus/'+genusKey+'/species/')
		.push(newSpecie)
}

export async function getAllFamilies(setFamilies) {
	await firebase.database().ref('families/')
	.on('value', (dataSnapshot) => {
    setFamilies(dataSnapshot.val())
  })
}

export async function getAllSpecies(setSpecies) {
	let speciesList = []
	await firebase.database().ref('families/')
	.on('value', (dataSnapshot) => {
    const familiesList = Object.entries(dataSnapshot.val()).map((fam) => fam[1])    
    familiesList.map((fam) => Object.entries(fam.genus).map((gen)=>{
    	Object.entries(gen[1].species).map((species)=>{
    		speciesList.push({...species[1], family: fam.name})
    	})
    }))
		setSpecies(speciesList)
  })
  console.log(speciesList)
}

export async function postNewFamily(family) {
	await firebase.database().ref('families/').push(family)
}

export async function postNewGenusByFamilyName(family, newGenus) {
	const familyKey = await getFamilyKey(family)
	await firebase.database().ref('families/'+familyKey+'/genus')
		.push({name: newGenus})
}