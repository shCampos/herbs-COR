import { findBestMatch } from 'string-similarity'
import { getAllSpecies } from './firebase.js'

export async function compareDescriptions(userDescription) {
	const allSpecies = await getAllSpecies()
	console.log(allSpecies, userDescription)

}