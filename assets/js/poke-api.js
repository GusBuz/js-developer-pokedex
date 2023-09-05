const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    // --------------- simple attributes
    const pokemon = new Pokemon()
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;


    // --------------- detailed attributes
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    pokemon.weight = pokeDetail.weight / 10;
    pokemon.abilities = abilities;
    pokemon.height = pokeDetail.height / 10;

    const statsCollection = statsCollectionCreator(pokeDetail);

    pokemon.stats.hp = statsCollection.hp;
    pokemon.stats.atk = statsCollection.attack;
    pokemon.stats.def = statsCollection.defense;
    pokemon.stats.satk = statsCollection["special-attack"];
    pokemon.stats.sdef = statsCollection["special-defense"];
    pokemon.stats.spd = statsCollection.speed;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getSinglePokemonDetail = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

function statsCollectionCreator(pokeDetail){
    let statsCollection = {};
    pokeDetail.stats.forEach(stat => {
        const name = stat.stat.name;
        statsCollection[name] = stat.base_stat;
    })
    return statsCollection;
}
