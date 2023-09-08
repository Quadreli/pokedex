const pokemonList = document.getElementById('pokemonList')  //Lista html
const loadMoreButton = document.getElementById('loadMoreButton')

// const maxRecords = 151 // Limita a 1ª geração
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    // const qtRecordWithNextPage = offset + limit

    // if(qtRecordWithNextPage >= maxRecords){  //Limite a 1 geração de pokemons
    //     const newLimit = maxRecords - offset
    //     loadPokemonItens(offset, limit)

    //     loadMoreButton.parentElement.removeChild(loadMoreButton) //remove o botao
    // } else{
        loadPokemonItens(offset, limit) //
    // }

}) 
