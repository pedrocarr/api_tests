import express from 'express'

const app = express()

const PORT = 3000


const products = Array.from({length: 10000}, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100000)
}))

app.get('/products', (req, res) => {
  const min = Number(req.query.min_price) || 0
  const max = req.query.max_price ? Number(req.query.max_price) : 100000
  const filtered = products.filter(p => p.price >= min && p.price <= max)

  const limited = filtered.slice(0, 1000)

  res.json({
    total: filtered.length,
    count: limited.length,
    products: limited
  })
})


app.listen(PORT, () => {

  console.log(`API is running on localhost:${PORT}/products`)

})