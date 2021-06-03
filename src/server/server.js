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
  //TODO: Check locations with spaces
  const location = req.body["formText"];
  const formDate = req.body["formDate"];
  const dateTrip = new Date(formDate);
  const today = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const week = today.getTime() + (msPerDay * 7);
  let weatheResponse = {};

  try {
    // Genonames API
    const geonResponse = await axios.get(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${GEON_USER}`)
    const latitude = geonResponse.data.geonames[0].lat;
    const longitude = geonResponse.data.geonames[0].lng;

    // Weatherbit API
    if (dateTrip.getTime() > week){
      //The trip is in the future => predicted forecast
      weatheResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API}&M=Metric&lat=${latitude}&lon=${longitude}&days=1`);
    } else {
      //The trip is within a week => current weather forecast
      weatheResponse = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${WEATHER_API}&M=Metric&lat=${latitude}&lon=${longitude}`);
    }
    // Pixabay API
    const pixaResponse = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API}&q=${location}&image_type=photo`);

    const newEntry = {
      country: geonResponse.data.geonames[0].countryName,
      location: location,
      high: weatheResponse.data.data[0].high_temp || '',
      low: weatheResponse.data.data[0].low_temp || '',
      description: weatheResponse.data.data[0].weather.description,
      temp: weatheResponse.data.data[0].temp || '',
      icon: `https://www.weatherbit.io/static/img/icons/${weatheResponse.data.data[0].weather.icon}.png`,
      urlImage: pixaResponse.data.hits[0].webformatURL, 
    }
    // To Development purpose. DELETE when you finish.
    /*
      const newEntry = {
      country: "UK",
      location: "London",
      high: "30",
      low: "4",
      description: "cloudy",
      temp: "20",
      icon: "https://www.weatherbit.io/static/img/icons/t01d.png",
      urlImage: "https://pixabay.com/get/g2307997b2e1a33deef7f5d9f2936961dcdde8e64539263a9f06b2db42baf3908afdd3431de0f0d580237fe71d38e51b9_640.jpg", 
    } */

    projectData = newEntry;
    res.send(projectData);
  } catch (error) {
    //TODO: Improve error handler
    console.log('Error: ', error);
  }
});
