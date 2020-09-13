import { findBestMatch } from 'string-similarity'
import { getAllSpecies } from './firebase.js'

export function compareDescriptions(userDescription) {
	const allSpecies = await getAllSpecies()
	console.log(allSpecies, userDescription)

}