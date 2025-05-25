import { writeFileSync } from 'fs'
import  axios from 'axios'

async function fetchPosts() {
  const results = []
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    for (const post of response.data) {
      results.push(post)
    }
    writeFileSync('posts.json', JSON.stringify(results, null, 2), 'utf-8')
  } catch (error) {
    throw new Error('Error fetching the posts', error)
  }
}

fetchPosts()