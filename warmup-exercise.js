/**
 * 1. Install node-fetch if your node version is less than 18
 * 2. Make a request to: https://www.craiglist.org/about/
 * 3. Compare what you see in Node to vistiting the actual page in your Browser
 */


async function fetchHtml() {
  try {
    const response = await fetch('https://www.craigslist.org/ab/')
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.text()
    console.log(data)
  } catch (error) {
    console.error('Error fetching the HTML', error)
  }
}

fetchHtml()