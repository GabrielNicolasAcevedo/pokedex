const listaPokemon = document.querySelector("#listaPokemon");
const url = "https://pokeapi.co/api/v2/pokemon/"

const fetchPokemon = fetch(url);

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
    })


const mostrarPokemon =  pokemon => {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-id-back">${pokemon.id}</p>
                    <div class="pokemon-imagen">
                        <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">${pokemon.id}</p>
                            <h2 class="pokemon-nombre">${pokemon.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            <p class=" ${pokemon.types[0].type.name} tipo">${pokemon.types[0].type.name}</p>
                            <p class="${pokemon.types[1].type.name} tipo">${pokemon.types[1].type.name}</p>
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${(pokemon.height)/10}m</p>
                            <p class="stat">${(pokemon.weight)/10}kg</p>
                        </div>`
                        ;
    listaPokemon.append(div);
};