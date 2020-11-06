export async function searchByName(itemName, returnResponse) {
  await fetch(`https://api.gbif.org/v1/species/match?verbose=false&kingdom=Plantae&name=${itemName}`)
  .then(res => res.json())
  .then(
    (result) => {
      returnResponse(result)
    },
    (error) => {
      console.log('error', error)
    }
  )
}
