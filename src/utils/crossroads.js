import {
  getItemKeyByGBIFKey,
  postNewItem,
  postOtherDescription,
} from './firebase.js'

export function sendNewItemToDB(newItem, setCommsDbFlag) {
  console.log(newItem)

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
    const familyKey = await checkFamily()
    if(familyKey === null) {
      await postNewItem('families', {gbifKey: newItem.familyGBIFKey, scientificName: newItem.familyName})
      .then(() => {
        console.log('familia enviada')
      })
      .catch((err) => {
        console.log(err)
        setCommsDbFlag('error')
      })
    }
    await postNewItem('genera', {...newItem, familyKey: familyKey}, (flag) => {
      setCommsDbFlag(flag)
    })
  }

  const isSpecie = async () => {
    const familyKey = await checkFamily()
    if(familyKey === null) {
      await postNewItem('families', {gbifKey: newItem.familyGBIFKey, scientificName: newItem.familyName})
      .then(() => {
        console.log('familia enviada')
      })
      .catch((err) => {
        console.log(err)
        setCommsDbFlag('error')
      })
    }
    const genusKey = await checkGenus()
    if(genusKey === null) {
      await postNewItem('genera', {gbifKey: newItem.genusGBIFKey, scientificName: newItem.genusName})
      .then(() => {
        console.log('genero enviado')
      })
      .catch((err) => {
        console.log(err)
        setCommsDbFlag('error')
      })
    }
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

export function sendNewDescriptionToDB(newItem, /*setCommsDbFlag*/) {
  const isFamily = () => {
    getItemKeyByGBIFKey('families', newItem.scientificName, (familyKey) => {
      console.log('familyKey', familyKey)
      postOtherDescription('families', familyKey, {
        description: newItem.itemDescription, 
        reference: newItem.itemReference
      }/*, (flag) => {
        setCommsDbFlag(flag)
      }*/)
    })
  }

  const isGenus = () => {
    console.log('in construction')
  }

  const isSpecie = () => {
    console.log('in construction')
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