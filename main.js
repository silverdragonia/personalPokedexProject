$(document).ready(function() {

	// define the trainer class to store pokemon object
	class Trainer {
		constructor(name, lvl, exp) {
			this.name = name;
			this.lvl = lvl;
			this.exp = exp;
			this.myPokemon = [];
		}	
		// method that returns an array of pokemon objects
		all() {
			return this.myPokemon;
		}
		// method that searchs for and returns a pokemon object with data
		get(name) {
			for (let i = 0; i < this.myPokemon.length; i++){
	 			let pokemonName = this.myPokemon[i].name;
	 			if(pokemonName == name) {
	 				return this.myPokemon[i];
 				}
			}
			return false;
		}
	}


	// define the pokemon class
	class Pokemon {
		constructor(name, id, img, hp, attack, defense, abilities) {
			this.name = name;
			this.id = id;
			this.img = img;
			this.hp = hp;
			this.attack = attack;
			this.defense = defense;
			this.abilities = abilities;
		}
	}


	// function that takes the pokemon name and id# to call data
	function loadInfo(name, id) {
		// get data - switched to github due to inconsistent API
		let apiOriginal = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
		let apiUrl = 'https://raw.githubusercontent.com/silverdragonia/personalPokedexProject/master/api/' + id + '.json';
		axios.get(apiUrl)		
 		// once loaded then run function
		.then(function(response) {
			let abilitiesApi = response.data.abilities;
			let abilitiesArr = [];
			for (let i = 0; i < abilitiesApi.length; i++) {
				abilitiesArr.push(abilitiesApi[i].ability.name);
			}
			// define pokemon object
			let info = {
				'name': response.data.name,
				'id': response.data.id,
				'img': response.data.sprites.front_shiny,
				'hp': response.data.stats[5].base_stat,
				'attack': response.data.stats[4].base_stat,
				'defense': response.data.stats[3].base_stat,
				'abilities': abilitiesArr
			}
			// push pokemon object to trainer pokemon list
			silverdragonia.myPokemon.push(info);
		})
		// catch if data doesn't load, deactivate button
		.catch(function(error) {
			$('#goBtnImg').attr('src', 'img/pokeballError.png');
			$('#goBtn').attr('disabled', 'disabled');
			$('#goBtnText').text('Oh no, error loading data! Please try again later.');
		});
	}

	// function that takes the pokemon name to call data
 	function loadBio(name) {
		// get data
	 	let apiUrl = 'https://raw.githubusercontent.com/silverdragonia/personalPokedexProject/master/api/bio.json';
	 	axios.get(apiUrl)
	 	.then(function(response) {
	 		// look for pokemon's name and return the data
	 		for (let i = 0; i < response.data.length; i++) {
	 			if (response.data[i].name == name) {
	 				let evolvesInto = response.data[i].evolves_into;
		 			let	bioText = response.data[i].bio;
		 			evolution.text(capitalize(evolvesInto));
		 			bio.text(bioText);
	 			}
	 		}
	 	})
	 	// catch if data doesn't load, show error
	 	.catch(function(error) {
			$('#' + name + 'Img').attr('src','img/error.png');
			$('#' + name + 'Text').text('Error, please try again later!');
		});
	 };

	// define new trainer and pokemon
	let silverdragonia = new Trainer('silverdragonia', 10, 9000);
	let bulbasaur = new Pokemon('bulbasaur', 1);
	let charmander = new Pokemon('charmander', 4);
	let squirtle = new Pokemon('squirtle', 7);
	
	// call function to get pokemon data and push to trainer object
	loadInfo(bulbasaur,1);
	loadInfo(charmander,4);
	loadInfo(squirtle,7);

	// define html elements
	let goBtn = $('#goBtn');
	let intro = $('#intro');
	let pokemonSelect = $('#pokemonSelect');
	let trainerRow = $('#trainerRow');
	let trainerName = $('#trainerName');
	let trainerLvl = $('#trainerLvl');
	let trainerExp = $('#trainerExp');
	let trainerImg = $('#trainerImg');
	let bulbasaurBtn = $('#bulbasaurBtn');
	let charmanderBtn = $('#charmanderBtn');
	let squirtleBtn = $('#squirtleBtn');
	let name = $('#pokemonName');
	let bio = $('#bio');
	let hp = $('#hp');
	let attack = $('#attack');
	let defense = $('#defense');
	let abilities = $('#abilities');
	let evolution = $('#evolution');
	let img = $('#img');
	let display = $('.info');
	let statImg = $('#statImg');
	let closeBtn = $('#closeBtn');

	// hide all data display on load
	display.hide();
	pokemonSelect.hide();
	trainerRow.hide();

	// function to return capitalized results for diplay
	function capitalize(str) {
    	return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	// function that takes pokemon name and updates html display
	function updateHtml(pokemon){
		let myPokemon = silverdragonia.get(pokemon);
			name.text(capitalize(myPokemon.name));
			statImg.attr('src', 'img/' + pokemon + 'Bg.jpg');
			img.attr('src', myPokemon.img);
			hp.text(myPokemon.hp);
			attack.text(myPokemon.attack);
			defense.text(myPokemon.defense);
			abilities.text(myPokemon.abilities);
			display.show(2000);
	}

	// call both functions in one pass
	function run(pokemon) {
		updateHtml(pokemon);
		loadBio(pokemon);
	};

	// listen for start button click
	goBtn.click(function() {
		// load trainer info
		trainerName.text(capitalize(silverdragonia.name));
		trainerLvl.text(silverdragonia.lvl);
		trainerExp.text(silverdragonia.exp);
		trainerImg.attr('src', 'img/trainer.gif');
		// hide intro and display pokedex
		intro.hide(1000);
		pokemonSelect.show(2000);
		trainerRow.show(2000);
	});
	
	// listen for pokemon button clicks and run funcations
	bulbasaurBtn.click(function() {
		run('bulbasaur');
	});
	charmanderBtn.click(function() {
		run('charmander');
	});
	squirtleBtn.click(function() {
		run('squirtle');
	});

	// listen for close button click
	closeBtn.click(function() {
		display.hide(1000);
	});

});