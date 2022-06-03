const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

let cache = {}

app.use(cors())
app.get('/api/v2/*', async (req, res) => {
  let url = req.url
  let existing = cache[url]

  if (existing) {
    console.log(`⚡️ Using cache!`)
    return res.json(existing)
  } else {
    console.log(`🐢 Hitting API`)
    try {
      const response = await axios.get(`https://pokeapi.co${url}`)
      let json = (response.data)
      cache[url] = json
      return res.json(json)
    } catch (e) {
      return res.json(e)
    }
  }
})

app.listen(5000, () => {
  console.log(`Server ready at http://localhost:5000`)
})