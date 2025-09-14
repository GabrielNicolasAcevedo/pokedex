const listaPokemon = document.querySelector("#listaPokemon");
const url = "https://pokeapi.co/api/v2/pokemon/";
const urlAll = "https://pokeapi.co/api/v2/pokemon?limit=150/";
const urlMorePoke = "https://pokeapi.co/api/v2/pokemon?limit=999"

const getPokemon = async () => {
    const response = await fetch(urlAll); // Fetches data and returns a promise
    const data = await response.json(); // promise to JSON parsing to get "results" array

    console.log(data) // check if data is fetched correctly

    for (p of data.results) { // for each element in results array
        const poke = await fetch(p.url) // fetch each pokemon data 
            .then(res => res.json()); // parse JSON 
        console.log(poke) // check if pokemon data is parsed correctly
        mostrarPokemon(poke);
    }

    /* Never ending recursive call
    if (data.next) {
        getPokemon(data.next);
    } 
    */
}

getPokemon();


/* Solution 1: Returns only 20 pokemon and unorder

fetchPokemon
    .then(response => response.json())
    .then(dataList => dataList.results)
    .then(data => {
            data.forEach(async p =>{
                const poke = fetch(p.url);
                await poke
                    .then(response=> response.json())
                    .then(poke => {
                    console.log(poke)
                    mostrarPokemon(poke)})
        })
    .catch(error)
    })
    */

/*   Solution 2 Returns all pokemon unorder 
const getPokemon = fetch(urlAll); // Returns a promise
getPokemon
    .then(res => res.json() ) // parse JSON into another promise, I need results array 
 
    .then(data => { // data is parsed JSON. results array is need to fetch pokemon data
        data.results.forEach( async p => { //iteraes through each result (name, url)
            const poke = await fetch(p.url) // fetches pokemon data from pokemon URL
                .then(res => 
                    res.json()) // Pokemon data JSON parse (id, name, stats, sprites, types, etc)
                    
                    mostrarPokemon(poke) //Calls function to append div cards for each pokemon on main page
                    console.log(poke);
        });
    });
*/

const mostrarPokemon = pokemon => {


    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    };

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = 
    `<p class="pokemon-id-back">#${pokeId}</p>

    <div class="pokemon-imagen">
        <img src=${pokemon.sprites.other["official-artwork"].front_default} alt="${pokemon.name}">
    </div>

    <div class="pokemon-info">

        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${pokemon.name}</h2>
        </div>

        <div class="pokemon-tipos">
            <p class="${pokemon.types[0].type.name} tipo">${pokemon.types[0].type.name}</p>
            ${pokemon.types[1] ? `<p class="${pokemon.types[1].type.name} tipo">${pokemon.types[1].type.name}</p>` : ""}
        </div>

        <div class="pokemon-stats">
            <p class="stat">${(pokemon.height) / 10}m</p>
            <p class="stat">${(pokemon.weight) / 10}kg</p>
        </div>

    </div>`
    ;
    listaPokemon.append(div);
};