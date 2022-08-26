const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

let config = {
  delay:
    isNaN(parseInt(process.env.DELAY))
      ? 0
      : parseInt(process.env.DELAY),
  port: process.env.PORT || 5000
}

let cache = {}

app.use(cors())
app.get('/api/v2/*', async (req, res) => {
  let url = req.url
  let existing = cache[url]

  if (config.delay > 0) {
    await new Promise(resolve => setTimeout(() => resolve(), config.delay))
  }

  if (existing) {
    console.log(`⚡️ Using cache!`)
    return res.json(existing)
  } else {
    console.log(`🐢 Hitting API`)
    try {
      const response = await axios.get(`https://pokeapi.co${url}`)
      let json = JSON.stringify(response.data)
        .split('https://pokeapi.co/api')
        .join(`http://localhost:${config.port}/api`)
      cache[url] = JSON.parse(json)
      return res.json(cache[url])
    } catch (e) {
      return res.json(e)
    }
  }
})

app.listen(config.port, () => {
  console.log(`API ready at http://localhost:${config.port}/api/v2/`)
})
