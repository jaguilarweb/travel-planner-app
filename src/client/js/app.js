const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.status(200).send('Test get endpoint')
})

module.exports = app;
