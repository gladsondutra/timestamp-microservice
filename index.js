const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

const result = { unix: "", utc: "" }

app.get('/api/:date?', (req, res) => {
  const input = req.params.date || Date.now();
  const date = new Date(input);
  if (!isNaN(date)) {
    result.unix = date.getTime();
    result.utc = date.toUTCString();
    res.json(result);
  }
  else if (Number(input) >= 0 && Number(input) <= 2147482800000) {
    result.unix = new Date(parseInt(input)).getTime()
    result.utc = new Date(parseInt(input)).toUTCString()
    res.json(result)
  }
  else {
    res.json({ error: "Invalid Date" });
  }
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on the port ${port}`)
})