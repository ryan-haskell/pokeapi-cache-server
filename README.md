# @ryannhg/pokeapi-cache-server
> Don't DDOS the PokeAPI!

## Try it out

__Note:__ This server requires [Node.js v16+](https://nodejs.org)

```bash
npm start
```

🚀 The API will be running at [http://localhost:5000/api/v2](http://localhost:5000/api/v2)

## Options

You can use these environment variables to customize how the API server runs.

### `PORT`

Which port should the server run on? (Default: `5000`)

__Example usage:__

```
PORT=7000 npm start
```

### `DELAY`

Helpful for simulating a slower API, in milliseconds (Default: `0`)

__Example usage:__

```
DELAY=1000 npm start
```
