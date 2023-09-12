
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { // Esta função recebe um objeto contendo detalhes de um Pokémon da PokeAPI e converte esses detalhes em um objeto do tipo Pokemon. Os detalhes incluem o número do Pokémon, nome, tipos e a URL da imagem. A função retorna um objeto Pokemon com essas informações.
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default   //imagem dos pokemons

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {   
    return fetch(pokemon.url)
            .then((response) => response.json()) 
            .then(convertPokeApiDetailToPokemon)
}           

//CODIGO CONSUMO API
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //requisicao http p/ buscar os pokemons 
        .then((response) => response.json())  //promisse convertida em json
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
     
}
