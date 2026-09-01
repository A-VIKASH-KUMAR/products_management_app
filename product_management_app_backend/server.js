const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
const productRoute = require("./src/routes/product.routes")
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/product",productRoute)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})