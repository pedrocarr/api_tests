import { writeFileSync } from 'fs'
import  axios from 'axios'

async function fetchPosts() {
  const results = []
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    if (response.status !== 200) {
      throw new Error(`Response Status is ${response.status}`)
    }
    for (const post of response.data) {
        results.push(post)
    }
    writeFileSync('posts.json', JSON.stringify(results, null, 2), 'utf-8')
    return results
  } catch (error) {
    console.error('Error fetching the posts', error)
  }
}

fetchPosts()