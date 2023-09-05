// --------------- pokemon list elements
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const generationSelector = document.getElementById("generationSelector");


// --------------- detailed pokemon elements
const detailedPokemon = document.getElementById("detailed-pokemon");
const pokemonListSection = document.getElementById("pokemonListSection");


// --------------- variables
let maxRecords = 151;
const limit = 10;
let offset = 0;
let position = 0;


// --------------- pokemon list functions
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon bg-${pokemon.type}" onclick="loadDetailedPokemon(${pokemon.number})">
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

function loadPokemonItems(offset, limit, position) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    window.scrollTo(0, position);
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

loadPokemonItems(offset, limit, position)

loadMoreButton.addEventListener('click', () => {
    position = window.scrollY;
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit, position)
        loadMoreButton.style.display = "none";
    } else {
        loadPokemonItems(offset, limit, position)
    }
})


// --------------- detailed pokemon functions
function convertDetailedPokemon(pokemon) {
    return `<div class="detailed-pokemon tag-${pokemon.type}">
                <div class="detailed-background">
                    <div class="detailed-title">
                        <button id="back-button" onclick="returnToList()">
                            <img src="assets/images/arrow_back.svg" alt="Flecha para voltar">
                        </button>        
                        <span class="detailed-name">${pokemon.name}</span>
                    </div>
                    <span class="detailed-number">#${pokemon.number}</span>
                </div>
                <img class="detailed-photo" src="${pokemon.photo}" alt="Ilustração do pokemon">
                <div class="detailed-infos">
                    <ol class="detailed-types">
                        ${pokemon.types.map((type) => `<li class="type tag-${type}">${type}</li>`).join('')}
                    </ol>
                    <h2>Sobre</h2>
                    <ol class="detailed-about">
                        <li class="measures-list">
                            <div class="measures-box">
                                <img src="assets/images/weight.svg" alt="Ícone de peso">
                                <span>${pokemon.weight} kg</span>
                            </div>
                            <span class="about-title">Peso</span>
                        </li>
        
                        <li class="vertical-line"></li>
        
                        <li class="moves-list">
                            ${pokemon.abilities.map((ability) => `<span>${ability}</span>`).join("")}
                            <span class="about-title">Habilidades</span>
                        </li>
        
                        <li class="vertical-line"></li>
        
                        <li class="measures-list">
                            <div class="measures-box">
                                <img src="assets/images/straighten.svg" alt="Ícone de régua">
                                <span>${pokemon.height} m</span>
                            </div>
                            <span class="about-title">Altura</span>
                        </li>
                    </ol>
        
                    <h2>Status Base</h2>
        
                    <ol class="stats-list">
                        ${Object.keys(pokemon.stats).map((key) => {
        const value = pokemon.stats[key];
        return `
                                <li class="stats-line">
                                    <h3>${key}</h3>
                                    <span>${value}</span>
                                    <div class="progress-bar">
                                        <div class="progress progress-${value}" onchange="loadProgressBar()"></div>
                                        <div class="exceeded-bar stat-${value}">+</div>
                                    </div>
                                </li>`
    }).join("")}
                    </ol>
                </div>
            </div>                
    `
}

function loadDetailedPokemon(pokemonId) {
    position = window.scrollY;
    window.scrollTo(0, 0);
    pokeApi.getSinglePokemonDetail(pokemonId).then((pokemon) => {
        pokemonListSection.style.display = "none"
        detailedPokemon.innerHTML = convertDetailedPokemon(pokemon);
        loadProgressBar();
    })
}

function loadProgressBar() {
    const progress = document.querySelectorAll('.progress');
    progress.forEach(function (progress) {
        let progressClasses = progress.className.split(",");
        let value = parseInt(progressClasses[0].substring(18));
        progress.style.width = value + "%";
    })

    const exceededBar = document.querySelectorAll(".exceeded-bar");
    exceededBar.forEach(function (stat) {
        let exceededClasses = stat.className.split(",");
        let value = parseInt(exceededClasses[0].substring(18));
        if (value > 100) {
            stat.style.display = "block";
        }
    })
}

function returnToList(){
    detailedPokemon.innerHTML = "";
    pokemonListSection.style.display = "block"
    window.scrollTo(0, position);
}
