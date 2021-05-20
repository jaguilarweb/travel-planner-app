const path = require('path');
//Config server express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const port = 8081;
app.listen(port, () => {
  console.log("server running...");
  console.log(`running on localhost:${port}`)
});


// ROUTES
/*---------------------------------
  Test Route
----------------------------------*/
app.get('/test', (req, res) => {
  res.status(200).send('Server working!');
});

/*---------------------------------
  GET Route
----------------------------------*/
app.get('/', (req, res) => {
  res.sendFile("dist/index.html");
});


