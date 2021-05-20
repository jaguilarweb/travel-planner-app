const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');


dotenv.config();

//Config server express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const port = process.env.PORT || 8081;
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


