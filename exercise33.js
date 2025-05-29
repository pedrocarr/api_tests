import axios from 'axios'
import { writeFile } from 'fs'

async function fetchImageBlob() {
  try {
    const response = await axios.get('https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png', {
      responseType: 'arraybuffer'
    })
    const { data } = response
    const buffer = Buffer.from(data)
    writeFile('image3.png', buffer, (err) => {
      if (err) console.error(err.message)
      console.log("Image saved successfully")
    })
  } catch (error) {
    console.error("Error fetching image", error)
  }
}
fetchImageBlob()

