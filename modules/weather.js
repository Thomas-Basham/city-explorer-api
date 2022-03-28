'use strict';
const axios = require('axios');

// Get data from Weatherbit
async function getWeatherBit (request, response) {

  try {

  let city = request.query.city;
  
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=3&lat&lon`;
  let weatherBitData = await axios.get(url);
    // console.log(weatherBitData.data);
  let weatherData = [];
  weatherBitData.data.data.filter ((element) => {
    let selectedCity = new Forecast(element);
    weatherData.push(selectedCity); 
  });
  response.send(weatherData);
  // console.log(weatherBitData);

  } catch(error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    })
    console.log(error);
  }
  }

// Class
  class Forecast {
    constructor(element) {
      this.date = element.datetime;
      this.description = element.weather.description;
    }
  }
  module.exports = getWeatherBit;