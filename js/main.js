const listaPokemon = document.querySelector("#listaPokemon");
const btnHeader = document.querySelectorAll(".btn-header");


const url = "https://pokeapi.co/api/v2/pokemon/";
const urlAll = "https://pokeapi.co/api/v2/pokemon?limit=150/";
const urlTypes = "https://pokeapi.co/api/v2/type/";
const getPokemon = async () => {
    const response = await fetch(urlAll); // Fetches data and returns a promise
    const data = await response.json(); // promise to JSON parsing to get "results" array

   // console.log(data) // check if data is fetched correctly

    for (p of data.results) { // for each element in results array
        const poke = await fetch(p.url) // fetch each pokemon data 
            .then(res => res.json()); // parse JSON 
       // console.log(poke) // check if pokemon data is parsed correctly
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

btnHeader.forEach(btn  => {
    btn.addEventListener("click", async (e) =>{  
        const type = e.target.textContent.toLowerCase(); // target button text content and transform to lowercase to match data in array
        console.log(type); // Check if it returns type string to lowercase

        listaPokemon.innerHTML= ""; // reset display list
        
        if (type === "ver todos") { // 
        return getPokemon()
        } 
        
        const urlType = await fetch(urlTypes + `${type}`); // fetch pokemon types with data type clicked
        const pokeType = await urlType.json(); //parse json with pokemon type data, I need pokemon array.
        console.log(pokeType); // check if data is parsed correctly

        for (let p of pokeType.pokemon) { //for every element in the object:pokeType in array:pokemon
            const poke = await fetch(p.pokemon.url); //fetch url of pokemon array
            const pokemon = await poke.json(); //convert to JSON to fetch pokemon data
            mostrarPokemon(pokemon);
        }
        })
    
});
