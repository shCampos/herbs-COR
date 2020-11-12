import {
  getItemKeyByGBIFKey,
  postNewItem,
} from './firebase.js'
import { searchByName } from './gbif.js'

export function sendNewItemToDB(newItem, setCommsDbFlag) {
  let familyKey = null,
      genusKey = null

  const checkFamily = async () => {
    await getItemKeyByGBIFKey('families', newItem.familyGBIFKey, (response) => {
      if(response !== null) {
        familyKey = response
      }
    })
    return familyKey
  }

  const checkGenus = async () => {
    await getItemKeyByGBIFKey('genera', newItem.genusGBIFKey, (response) => {
      if(response !== null) {
        genusKey = response
      }
    })
    return genusKey
  }

  const postFamily = async () => {
    await searchByName(newItem.familyName, async (gbifResponse) => {
      await postNewItem('families', {
        gbifKey: gbifResponse.usageKey,
        scientificName: gbifResponse.scientificName
      })
      .then(() => {
        setCommsDbFlag({
          severity: 'info',
          alertTitle: 'Nova família cadastrada no banco de dados.',
          alertText: `Como a família ${newItem.familyName} não existia, ela foi cadastrada também.`
        })
      })
      .catch((err) => setCommsDbFlag({
        severity: 'error',
        alertTitle: 'Ocorreu um erro.',
        alertText: err.message
      }))
    })
  }

  const postGenus = async () => {
    await searchByName(newItem.genusName, async (gbifResponse) => {
      await postNewItem('genera', {
        gbifKey: gbifResponse.usageKey,
        scientificName: gbifResponse.scientificName,
        familyKey: familyKey
      })
      .then(() => {
        setCommsDbFlag({
          severity: 'info',
          alertTitle: 'Novo gênero cadastrado no banco de dados.',
          alertText: `Como o gênero ${newItem.genusName} não existia, ele foi cadastrada também.`
        })
      })
      .catch((err) => setCommsDbFlag({
        severity: 'error',
        alertTitle: 'Ocorreu um erro.',
        alertText: err.message
      }))
    })
  }
  
  
  const isFamily = async () => {
    await postNewItem('families', newItem)
    .then(() => setCommsDbFlag({
      severity: 'success',
      alertTitle: 'Nova família cadastrada no banco de dados.'
    }))
    .catch((err) => setCommsDbFlag({
      severity: 'error',
      alertTitle: 'Ocorreu um erro.',
      alertText: err.message
    }))
  } 

  const isGenus = async () => {
    // Checa a familia e manda pro banco se necessário
    await checkFamily()
    if(familyKey === null) {
      await postFamily()
    }
    // Manda o genero pro banco
    await postNewItem('genera', {...newItem, familyKey: familyKey})
    .then(() => setCommsDbFlag({
      severity: 'success',
      alertTitle: 'Novo gênero cadastrado para o banco de dados.'
    }))
    .catch((err) => setCommsDbFlag({
      severity: 'error',
      alertTitle: 'Ocorreu um erro.',
      alertText: err.message
    }))
  }

  const isSpecie = async () => {
    // Checa a familia e o gênero e manda pro banco se necessário
    await checkFamily()
    await checkGenus()
    if(familyKey === null) {
      await postFamily()
    }
    if(genusKey === null) {
      await postGenus()
    }
    // Manda o genero pro banco
    await postNewItem('species', {...newItem, familyKey: familyKey, genusKey: genusKey})
    .then(() => setCommsDbFlag({
      severity: 'success',
      alertTitle: 'Nova espécie cadastrada para o banco de dados.'
    }))
    .catch((err) => setCommsDbFlag({
      severity: 'error',
      alertTitle: 'Ocorreu um erro.',
      alertText: err.message
    }))
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