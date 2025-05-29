/**
 *  1. Install Node fetch if ypur node version is less than 18
 *  2. Import "fs" from "fs/promises" which is built-in to NodeJS
 *  3. Go to "wallhaven.cc" and find a wallpaper and "open image in new tab" to have only the image in the tab
 *  The URL should end with .png or .jpg
 *  Eg.: https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png
 *  4. Use fetch to get this image and fetch it correctly, then use "fs" to write a file to your filesystem with the actual image
 *  itself so you can open it after you run the script. Note that teses functions in fs return promises
 *  5. This is specially challenging to make you google and see how can you save the image correctly.
 */

import {writeFile} from 'fs'

async function fetchImage() {
  try {
    const response = await fetch('https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png')

    if(!response.ok) {
      throw new Error(`Reponse failed ${response.status}`);
    }

    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)
    console.log("🚀 ~ fetchImage ~ buffer:", buffer)
    writeFile('image1.png', buffer, (err) => {
      if (err) console.error(err.message)
      console.log("Image was saved succesfully")
    })
  } catch (error) {
    console.error(error.message)
  }
}

fetchImage()


async function fetchImageBlob() {
  try {
    const response = await fetch('https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png')
    if (!response.ok) {
      throw new Error(`Request failes status code is ${response.status}`)
    }
    const data = await response.blob()
    data.name = 'image2.png'
    data.lastModified = new Date()
    const myFile = new File([data], 'image2.png', {
      type: data.type,
    })

    const buffer = await myFile.arrayBuffer()
    const blobToBuffer = Buffer.from(buffer)
    writeFile('image2.png', blobToBuffer, (err) => {
      if (err) console.error(err.message)
      console.log('File from Blob saved succesfully')
    })
  } catch (error) {
    console.error(error.message)
  }
}

fetchImageBlob()