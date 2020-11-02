export async function searchSpecieName(itemName, setQueryResponse) {
  await fetch(`https://api.gbif.org/v1/species/match?verbose=false&kingdom=Plantae&name=${itemName}`)
  .then(res => res.json())
  .then(
    (result) => {
      setQueryResponse(result)
    },
    (error) => {
      console.log('error', error)
    }
  )
}

export function getItemByGBIFid(id) {

}