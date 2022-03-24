 'use strict';
 // Dotenv
 require('dotenv').config();
 console.log('City Explorer Server is Running');

// REQUIRE
// Requirements for server:
// Express takes 2 steps: 'require" and 'use.'
const express = require('express'); 
const app = express();

// We must include cors if we want to share resources over the web
const cors = require('cors');

// Bring in Axios
const axios = require('axios');

// import our data from json data
// let data = require('./data/weather.json');


// bring in request
// const { require } express  = require('express');

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." 

app.use(cors());

// define PORT and validate .env file is working
const PORT = process.env.PORT || 3002; // something is wrong if on 3002


// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get

// Server 
app.get('/', (request, response) => {
  response.send('This is the server response.send !');
});

// Get our data from: let data = require('./data/weather.json');
// app.get('/weather', (request, response) => { 
//   try {
//   let citySearchQuery = request.query.searchQuery;
  
//   let weatherObject = data.find(element => element.city_name.toLowerCase() === citySearchQuery.toLowerCase())
  
//   let weatherData = [];
//   weatherObject.data.filter ((element) => {
//     let selectedCity = new Forecast(element);
//     weatherData.push(selectedCity); 
//   })

//   response.send(weatherData);

//   } catch(error) {

//     next(error); // SEND TO app.use down below
    
//   }
// });

// Get our data from Weatherbit API
// API Call for Weatherbit http://api.weatherbit.io/v2.0/current 
// EXAMPLE REQUEST: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
// FROM THUNDER CLIENT https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=4be57259674a48259b9dbb74f75da13d&include=minutely 
app.get('/weatherbit', async (request, response) => {

  try {

  let searchQueryCity = request.query.city_name;
  
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryCity}&key=${process.env.WEATHER_API_KEY}&days=3&lat&lon`;
  let weatherBitData = await axios.get(url);
    // console.log(weatherBitData.data);
  let weatherData = [];
  weatherBitData.data.data.filter ((element) => {
    let selectedCity = new Forecast(element);
    weatherData.push(selectedCity); 
  });
  response.send(weatherData);
  console.log(weatherBitData);

  } catch(error) {

    // next(error); // SEND TO app.use down below
    console.log(error);
  }

  
  });


  // GET OUR MOVIE DATA 
app.get('/movies', async (request, response) => {

  try {

  let searchQueryCity = request.query.searchQueryCity;
  
  let url = `https://api.themoviedb.org/3/search/movie?api_key=92af06b062b73eb59df1c5c37ccda80a&query=seattle`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY
  let movieTimes = await axios.get(url);
    console.log(url);
  let movieData = [];
  movieTimes.data.results.filter ((element) => {
    let selectedCity = new MovieTimes(element);
    movieData.push(selectedCity); 
  });
  response.send(movieData);
  console.log(movieData);

  } catch(error) {

    // next(error); // SEND TO app.use down below
    console.log(error);
  }

  });


app.get('*', (request, response) => {
  response.send('This page does not exist');
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 

// CLASSES
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

class MovieTimes {
  constructor(element) {
    this.results = element.results;
    // this.description = element.weather.description;
  }
}

// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));



