import { findBestMatch } from 'string-similarity'
import { getAllSpecies } from './firebase.js'

export async function compareDescriptions(userDescription, allSpecies) {
	const justDescriptions = await allSpecies.map((specie) => specie.description)	
	const probableSpecies = await findBestMatch(userDescription, justDescriptions)
	probableSpecies.ratings.sort((a, b) => -(a.rating>b.rating)||+(a.rating<b.rating))

	console.log(allSpecies, probableSpecies)

	let probableSpeciesComplete = []
	let i = 0
	probableSpecies.ratings.forEach((pSpecie) => {
		allSpecies.forEach((specie) => {			
			if(pSpecie.target==specie.description && i < 10) {
				probableSpeciesComplete.push({scientificName: specie.scientificName, description: specie.description, rating: pSpecie.rating})
				i++
			}
		})
	})
	console.log(probableSpeciesComplete)
	return probableSpeciesComplete
}