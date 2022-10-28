const express = require('express')
const assets = require('./routers/assetsRouter')
const spends = require ('./routers/spendsRouter')

const app = express()
const port = 3000

app.use('/assets', assets)
app.use('/spends', spends)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})