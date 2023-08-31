const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const generationSelector = document.getElementById("generationSelector");
let maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon bg-${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">                
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type tag-${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </li>
    `
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function filterByGeneration(){
    switch (generationSelector.value) {
        case "generation1":
            pokemonList.innerHTML = "";
            offset = 0;
            maxRecords = 151
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation2":
            pokemonList.innerHTML = "";
            offset = 151;
            maxRecords = 251;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation3":
            pokemonList.innerHTML = "";
            offset = 251;
            maxRecords = 386;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation4":
            pokemonList.innerHTML = "";
            offset = 386;
            maxRecords = 493;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation5":
            pokemonList.innerHTML = "";
            offset = 493;
            maxRecords = 649;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation6":
            pokemonList.innerHTML = "";
            offset = 649;
            maxRecords = 721;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation7":
            pokemonList.innerHTML = "";
            offset = 721;
            maxRecords = 809;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation8":
            pokemonList.innerHTML = "";
            offset = 809;
            maxRecords = 905;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
        case "generation9":
            pokemonList.innerHTML = "";
            offset = 905;
            maxRecords = 1010;
            loadPokemonItems(offset, limit)
            loadMoreButton.style.display = "inline-block";
            break;
    }
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        // loadMoreButton.parentElement.removeChild(loadMoreButton)
        loadMoreButton.style.display = "none";
    } else {
        loadPokemonItems(offset, limit)
    }
})