const axios = require('axios');
var firebase = require('firebase/app');
const fetch = require('node-fetch');
require('firebase/database')

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDULUALMQA7hXa7pfgArN9u0QFd6tPEN_s",
	authDomain: "especies-pantanal.firebaseapp.com",
	databaseURL: "https://especies-pantanal.firebaseio.com",
	projectId: "especies-pantanal",
	storageBucket: "especies-pantanal.appspot.com",
	messagingSenderId: "201819029776",
	appId: "1:201819029776:web:ab0ffe3c0a2b33bb92e595"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function start() {
	let k = 0, min = 11, max = min + 2
	for (var m = min; m <= max; m++) {
		const response = await fetch('https://trefle.io/api/v1/families?token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds&page='+m);
		const json = await response.json();
		json.data.forEach(async (fam)=>{
			const genLixo = await fetch('https://trefle.io/api/v1/genus?family_id='+fam.slug+'&token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds')
			const genLixojson = await genLixo.json()

			let a = genLixojson.links.last.substring(genLixojson.links.last.search('=')+1)
			let lastPage = Number(a.substring(a.search('=')+1))
			let generos = []

			for(let j=1;j<=lastPage;j++) {
				const genResponse = await fetch('https://trefle.io/api/v1/genus?family_id='+fam.slug+'&token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds&page='+j)
				const genResponseJson = await genResponse.json()
				if(genResponseJson.data){genResponseJson.data.forEach((g)=>{generos.push(g)})}
			}

			await firebase.database().ref('families/').push({
				leafletId: fam.id,
				name: fam.name,
				genus: generos
			})
			.then(()=>{k++;console.log(k)})
			.catch((err)=>console.log(err))
		})		
	}

	
}
start()
// for (var i = 1; i <= 34; i++) {
// 	(async () => {
// 		await axios.get('https://trefle.io/api/v1/families?token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds&page='+i)
// 		.then(async (res) => {
// 			res.data.data.forEach(async (el) => {
// 				let generos = []
// 				await axios.get('https://trefle.io/api/v1/genus?family_id='+el.slug+'&token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds')
// 				.then(async (bla) => {
// 					let a = bla.data.links.last.substring(bla.data.links.last.search('=')+1)
// 					let lastPage = Number(a.substring(a.search('=')+1))
// 					for(let j=1;j<=lastPage;j++){
// 						await axios.get('https://trefle.io/api/v1/genus?family_id='+el.slug+'&token=OwiH96CrQN8DAAlZyhnvXIBBGcDyEDF4X8iWzbpP-Ds&page='+j)
// 						.then(async (genus) => {
// 							console.log(genus.data.data)
// 							genus.data.data.forEach((g)=>{
// 								console.log(g)
// 								generos.push(g)
// 								console.log('IAGGSUAOAGOSOI')
// 							})
// 						})
// 						.catch((err)=>console.log(err))
// 					}					
// 				})
// 				.catch((err)=>console.log(err))

// 				await firebase.database().ref('families/').push({
// 					leafletId: el.id,
// 					name: el.name,
// 					genus: generos
// 				})
// 				.then(()=>console.log('enviou'))
// 				.catch((err)=>console.log(err))
// 			})			
// 		})
// 		.catch((err) => {
// 			console.log(err)
// 		})
// 	})();
// }