const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

const result = { "unix": "", "utc": "" }

app.get('/api/:date?', (req, res) => {
  const input = req.params.date || Date.now();
  const date = new Date(input);

  if (!isNaN(date)) {
    result.unix = Math.floor(date / 1000);
    result.utc = date.toString();
    res.json(result);
  }
  else if (new Date(input * 1000) != "Invalid Date") {
    result.unix = parseInt(input)
    result.utc = new Date(input * 1000).toString()
    res.json(result)
  } else {
    res.json({ error: "Invalid Date" });
  }
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on the port ${port}`)
})