const fetch = require('node-fetch');

const geo = () => fetch('https://api.db-ip.com/v2/free/self')
  .then(response => response.json());

module.exports = geo;