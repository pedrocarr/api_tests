import axios from 'axios'
import { writeFileSync } from 'fs'


const MAX_PRODUCTS_PAGINATION = 1000

const PIVOT_PRICE_RANGES = [
  { min: 0, max: 999},
  { min: 1000, max: 9999},
  { min: 10000, max: 99999},
  { min: 100000, max: 999999},
  { min: 1000000, max: 4999999},
  { min: 5000000, max: 10000000},
]

const createFilterUrl = ({ min, max }) => {
  const minString = `min_price=${(min / 100).toFixed(2)}`
  const maxString = max !== null ? `&max_price=${(max / 100).toFixed(2)}` : ''

  return `http://localhost:3000/products?${minString}${maxString}`
}

const splitFilter = ({ min, max }) => {
  if (max !== null && min > max) throw new Error("Invalid filter: min >= max")
  const middle = max !== null ? min + Math.floor((max - min) / 2) : min * 2

  const filterMin = { min, max: Math.max(middle, min)}
  const filterMax = {
    min: max !== null ? Math.min(middle + 1, max) : middle + 1, max
  }

  return [filterMin, filterMax]
}

async function fetchAllProducts() {
  const products = []
  const queue = [...PIVOT_PRICE_RANGES]

  while (queue.length > 0) {
    const { min, max } = queue.shift()

    const url = createFilterUrl({ min, max})

    try {
      const response = await axios.get(url)

      const data = response.data

      if (data.total <= MAX_PRODUCTS_PAGINATION) {
          products.push(...data.products)
      } else {
        const newFilters = splitFilter({ min, max })
        queue.push(...newFilters)
      }
    } catch (error) {
      console.error("Failed to fetch url", error.message)
    }
  }

  return products
}

fetchAllProducts().then(data => {
  console.log(`Products length is ${data.length}`)
  writeFileSync('products2.json', JSON.stringify(data, null, 2), 'utf-8')
})