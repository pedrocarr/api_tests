import axios from "axios";

async function fetchHTML () {
  try {
    const response = await axios.get('https://www.craigslist.org/about/')
    return response.data
  } catch (error) {
    console.error('Error fetching HTML', error)
  }
}

fetchHTML().then(data => {
  console.log(data)
})

async function fetchHTML1() {
  try {
    const response = await fetch('https://www.craigslist.org/about/')
    const data = response.text()

    return data
  } catch (error) {
    console.error(`Error fetching HTML in fetch method`, error)
  }
}

fetchHTML1().then(data => {
  console.log(data)
})