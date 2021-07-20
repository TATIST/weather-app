const express = require('express');
const path = require('path');
const geo = require('./services/geolocation');

const app = express();
const port = process.env.PORT || 8080;

const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

// sendFile will go here
app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.get('/city', async (req, res) => {
  const geoData = await geo();
  res.send({...geoData});
})

app.listen(port);
console.log('Server started at http://localhost:' + port);