import axios from 'axios'
import { writeFileSync } from 'fs'

// Constants (in cents)
const MAX_PRODUCTS_PAGINATION = 1000

const PIVOT_PRICE_RANGES = [
  { min: 0, max: 999 },            // $0.00 - $9.99
  { min: 1000, max: 9999 },        // $10.00 - $99.99
  { min: 10000, max: 99999 },      // $100.00 - $999.99
  { min: 100000, max: 999999 },    // $1000.00 - $9999.99
  { min: 1000000, max: 4999999 },  // $10000.00 - $49999.99
  { min: 5000000, max: 10000000 }  // $50000.00 - $100000.00
]

// URL builder
const createFilterUrl = ({ min, max }) => {
  const minString = `min_price=${(min / 100).toFixed(2)}`
  const maxString = max !== null ? `&max_price=${(max / 100).toFixed(2)}` : ''
  return `http://localhost:3000/products?${minString}${maxString}`
}

// Range splitter
const splitFilter = ({ min, max }) => {
  if (max !== null && min >= max) {
    throw new Error(`Invalid filter: min (${min}) >= max (${max})`)
  }

  const middle = max !== null
    ? min + Math.floor((max - min) / 2)
    : min * 2

  const filterMin = { min, max: Math.max(middle, min) }
  const filterMax = {
    min: max !== null ? Math.min(middle + 1, max) : middle + 1,
    max
  }

  return [filterMin, filterMax]
}

// Main fetch function
async function fetchAllProducts() {
  const products = []
  const queue = [...PIVOT_PRICE_RANGES]

  while (queue.length > 0) {
    const { min, max } = queue.shift()
    const url = createFilterUrl({ min, max })

    try {
      const response = await axios.get(url)
      const data = response.data

      if (data.total <= MAX_PRODUCTS_PAGINATION) {
        products.push(...data.products)
        console.log(`✅ Fetched ${data.products.length} products for range ${min}-${max}`)
      } else {
        console.log(`⚠️ Too many products (${data.total}) for range ${min}-${max}, splitting...`)
        const newFilters = splitFilter({ min, max })
        queue.push(...newFilters)
      }
    } catch (error) {
      console.error(`❌ Failed to fetch ${url}`, error.message)
    }
  }

  return products
}

// Execute
fetchAllProducts().then(products => {
  console.log(`🎉 Total products fetched: ${products.length}`)
  writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf-8')
})
