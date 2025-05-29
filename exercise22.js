import axios from "axios"

async function fetchPokemon() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')

    const { data } = response

    return data.sprites.other['official-artwork']
  } catch (error) {
    console.error(`Fetch Pokemon Failed`, error.message)
  }
}

fetchPokemon().then(data => {
  console.log(data['front_default'])
})

