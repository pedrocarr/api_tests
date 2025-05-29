import { writeFileSync } from 'fs'
import axios from 'axios'


async function fecthPosts() {

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')



    writeFileSync('posts1.json', JSON.stringify(response.data, null, 2), 'utf-8')
    return response.data
  } catch (error) {
    console.error('Error fetching the posts', error.message)
  }
}

fecthPosts().then(posts => {
  console.log(posts)
})


async function fetchPosts () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching post method`, error.message)
  }
}

// fecthPosts().then(data => {
//   console.log(data)
//   writeFileSync('posts3.json', JSON.stringify(data, null, 2), 'utf-8')
// })





