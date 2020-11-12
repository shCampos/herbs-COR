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

export function getFamilyByKey(familyKey, returnFamily) {
	firebase.database().ref('plantae/families/')
	.orderByKey()
	.equalTo(familyKey)
	.on('value', (dataSnapshot) => {
		returnFamily(dataSnapshot.val())
	})
}

export async function getAllSpecies(returnSpecies) {
	await firebase.database().ref('plantae/species/')
	.on('value', (dataSnapshot) => {
    returnSpecies(dataSnapshot.val())
  })
}

export function getItemByKey(path, itemKey) {
	return firebase.database().ref(`plantae/${path}/${itemKey}`)
	.once('value', (dataSnapshot) => dataSnapshot.val())
}

export function getItemByGBIFKey(path, gbifKey, returnItem) {
	firebase.database().ref(`plantae/${path}`)
	.orderByChild('gbifKey')
	.equalTo(gbifKey)
	.once('value', (dataSnapshot) => {
		returnItem(dataSnapshot.val())
	})
}

export function getItemByName(path, itemName, returnItem) {
	firebase.database().ref(`plantae/${path}/`)
	.orderByChild('scientificName')
	.equalTo(itemName)
	.on('value', (dataSnapshot) => {
		returnItem(dataSnapshot.val())
	})
}

export function getItemKeyByGBIFKey(path, gbifKey, returnItem) {
	firebase.database().ref(`plantae/${path}/`)
	.orderByChild('gbifKey')
	.equalTo(gbifKey)
	.on('value', (dataSnapshot) => {
		let auxItemKey = [null]
		if(dataSnapshot.val() !== null && typeof dataSnapshot.val() !== 'undefined') {
			auxItemKey = Object.keys(dataSnapshot.val())
		}
		returnItem(auxItemKey[0])
	})
}

export function postNewItem(path, itemDetails) {
	if(itemDetails.itemDescription && itemDetails.itemReference) {
		itemDetails = {...itemDetails, descriptions: [{description: itemDetails.itemDescription, reference: itemDetails.itemReference}]}
	}
	sanitize(itemDetails)

	return firebase.database().ref(`plantae/${path}/`).push({...itemDetails})
}

export function setItemDetails(path, itemKey, itemDetails) {
	sanitize(itemDetails)

	return firebase.database().ref(`plantae/${path}/${itemKey}`)
	.set({...itemDetails})
}

export async function postOtherItemDescription(path, itemKey, newDescription) {
	let auxItemDetails = await getItemByKey(path, itemKey)
	let itemDetails = auxItemDetails.val()
	
	if(itemDetails.descriptions) {
		itemDetails.descriptions.push(newDescription)
	} else {
		itemDetails = {...itemDetails, descriptions: [{
			description: newDescription.description,
			reference: newDescription.reference
		}]}
	}
	sanitize(itemDetails)

	return firebase.database().ref(`plantae/${path}/${itemKey}`)
	.set({
		...itemDetails
	})
}

function sanitize(itemDetails) {
	delete itemDetails['itemDescription']
	delete itemDetails['itemReference']
	delete itemDetails['familyName']
	delete itemDetails['genusName']
	delete itemDetails['rank']
	delete itemDetails['familyGBIFKey']
	delete itemDetails['genusGBIFKey']
	delete itemDetails['firebaseKey']
	delete itemDetails['databasePath']
	delete itemDetails['alreadySearched']
	delete itemDetails['specieKey']

	return itemDetails
}