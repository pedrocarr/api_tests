/**
 *  1. Install Node fetch if your Node version is less than 18
 *  2. Have a read through pokeapi.co
 *  3. Make a request to:
 *  https://pokeapi.co/api/v2/pokemon/pikachu
 *  and print out pikachu's "official-artwork's URL for their image (png)"
 */

async function fetchPikachuURL() {
  const result = []
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    if (!response.ok) {
      throw new Error(`Response status is ${response.status}`)
    }
    const data = await response.json()
    const {sprites} = data
    result.push(sprites.other['official-artwork'])

    return result
  } catch (error) {
    console.error('Error fetching Pikachu', error)
  }
}

fetchPikachuURL().then(result => result.map(url => console.log(url.front_default)))