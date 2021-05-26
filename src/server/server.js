const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// Apis keys
const GEON_USER = process.env.GEON_USER;
const WEATHER_API= process.env.WEATHER_API;
const PIXABAY_API= process.env.PIXABAY_API;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Config server express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log("server running...");
  console.log(`running on localhost:${port}`);
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

/*---------------------------------
  POST Route
----------------------------------*/

app.post('/dataAnalyze', async (req, res) => {
//  const location = req.body["formText"];
//  const date = req.body["formDate"];
  const formDate = "2021-06-25T00:00:00"
  const location = "London";

  //const dateTrip = new Date(req.body["formDate"]);
  const dateTrip = new Date(formDate);
  const today = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const week = today.getTime() + (msPerDay * 7);
  let weatheResponse = {};

  try {
    const geonResponse = await axios.get(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${GEON_USER}`)
    const latitude = geonResponse.data.geonames[0].lat;
    const longitude = geonResponse.data.geonames[0].lng;
    if (dateTrip > week ){
      //Date future => Forecast
      weatheResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API}&M=Metric&lat=${latitude}&lon=${longitude}&days=1`)
      console.log(weatheResponse.data.data)
      console.log(weatheResponse.data.data[0].weather.description)
    } else {
       //Date within week => current
      weatheResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${WEATHER_API}&M=Metric&lat=${latitude}&lon=${longitude}`)
      console.log(weatheResponse.data.data)
      console.log(weatheResponse.data.data[0].weather.description)
    }

    const newEntry = {
      contry: geonResponse.data.geonames[0].countryName,
      location: location,
      high: weatheResponse.data.data[0].high_temp || '',
      low: weatheResponse.data.data[0].min_temp || '',
      description: weatheResponse.data.data[0].weather.description,
      temp: weatheResponse.data.data[0].temp || '', 
      date: formDate,
    }
    console.log(newEntry)
    projectData = newEntry;
    res.send(projectData);
  } catch (error) {
    console.log('Error: ', error);
  }
});


//https://pixabay.com/api/?key=${PIXABAY_API}&q=${location}&image_type=photo