'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./new_modules/weather');
const getMovies = require('./new_modules/movies')

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002; // something is wrong if on 3002

// Server 
app.get('/', (request, response) => {
  response.send('Welcome to the city explorer server!');
});

app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

  // Error
  app.get('*', (request, response) => {
    response.send('This page does not exist');
  });
  
  // ERRORS
  app.use((error, request, response, next) => {
    response.status(500).send(error.message);
  }) 

function weatherHandler(request, response) {
  const  cityweather  = request.query.city;
  getWeather(cityweather)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

function movieHandler(request, response) {
  const  city  = request.query.city;
  getMovies(city)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
