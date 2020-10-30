export function searchFamilyAndSpecieNames(familyName, itemName) {
  fetch(`https://api.gbif.org/v1/species/match?verbose=false&kingdom=Plantae&name=${itemName}`)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
    },
    (error) => {
      console.log('error', error)
    }
  )
}

export function getItemByGBIFid(id) {

}