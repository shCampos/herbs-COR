import { findBestMatch } from 'string-similarity'

export async function compareDescriptions(userDescription, allSpecies) {
	const justDescriptions = await allSpecies.map((specie) => specie.description)	
	const probableSpecies = await findBestMatch(userDescription, justDescriptions)
	probableSpecies.ratings.sort((a, b) => -(a.rating>b.rating)||+(a.rating<b.rating))

	let probableSpeciesComplete = []
	let i = 0
	probableSpecies.ratings.forEach((pSpecie) => {
		allSpecies.forEach((specie) => {			
			if(pSpecie.target === specie.description && i < 10) {
				probableSpeciesComplete.push({scientificName: specie.scientificName, description: specie.description, rating: pSpecie.rating})
				i++
			}
		})
	})
	
	return probableSpeciesComplete
}