import {
  getItemKeyByGBIFKey,
  postNewItem,
  postOtherDescription,
} from './firebase.js'
import { searchByName } from './gbif.js'

export function sendNewItemToDB(newItem, setCommsDbFlag) {
  console.log('ta no metodo sendNewItemToDB')

  const checkFamily = async () => {
    let familyKey = null
    await getItemKeyByGBIFKey('families', newItem.familyGBIFKey, (response) => {
      if(response !== null) {
        familyKey = response
      }
    })
    return familyKey
  }

  const checkGenus = async () => {
    let genusKey = null
    await getItemKeyByGBIFKey('genera', newItem.genusGBIFKey, (response) => {
      if(response !== null) {
        genusKey = response
      }
    })
    return genusKey
  }

  const isFamily = async () => {
    await postNewItem('families', newItem)
    .then(() => setCommsDbFlag('success'))
    .catch((err) => {
      console.log(err)
      setCommsDbFlag('error')
    })
  } 

  const isGenus = async () => {
    let familyKey = await checkFamily()
    if(familyKey === null) {
      await searchByName(newItem.familyName, async (gbifResponse) => {
        await postNewItem('families', {
          gbifKey: gbifResponse.usageKey,
          scientificName: gbifResponse.scientificName
        })
        .then(async () => {
          console.log('familia enviada')
          familyKey = await checkFamily()
        })
        .catch((err) => {
          console.log(err)
          setCommsDbFlag('error')
        })
      })
    }
    console.log('familyKey', familyKey)
    await postNewItem('genera', {...newItem, familyKey: familyKey}, (flag) => {
      setCommsDbFlag(flag)
    })
  }

  const isSpecie = async () => {
    let familyKey = await checkFamily()
    let genusKey = await checkGenus()

    if(familyKey === null) {
      await searchByName(newItem.familyName, async (gbifResponse) => {
        await postNewItem('families', {
          gbifKey: gbifResponse.usageKey,
          scientificName: gbifResponse.scientificName
        })
        .then(async () => {
          console.log('familia enviada')
          familyKey = await checkFamily()
        })
        .catch((err) => {
          console.log(err)
          setCommsDbFlag('error')
        })
      })
    }
    if(genusKey === null) {
      await searchByName(newItem.genusName, async (gbifResponse) => {
        await postNewItem('genera', {
          gbifKey: gbifResponse.usageKey,
          scientificName: gbifResponse.scientificName,
          familyKey: familyKey
        })
        .then(async () => {
          console.log('genero enviado')
          genusKey = await checkGenus()
          console.log('genusKey', genusKey)
        })
        .catch((err) => {
          console.log(err)
          setCommsDbFlag('error')
        })
      })
    }
    console.log('familyKey', familyKey)
    console.log('genusKey', genusKey)
    await postNewItem('species', {...newItem, familyKey: familyKey, genusKey: genusKey})
    .then(() => setCommsDbFlag('success'))
    .catch((err) => {
      console.log(err)
      setCommsDbFlag('error')
    })
  }

  switch(newItem.rank) {
    case 'FAMILY':
      isFamily()
      break
    case 'GENUS':
      isGenus()
      break
    case 'SPECIES':
      isSpecie()
      break
  }
}

/*
  ver se é genero, espécie ou família (DONE!)
  ver se já ta no db
  se não:
    ver se a família já existe
      se não:
        buscar no GBIF e adicionar
    ver se o gênero já existe
      se não:
        buscar no GBIF e adicionar
*/