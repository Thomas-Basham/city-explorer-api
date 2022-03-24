'use strict';
const axios = require('axios');

async function getWeatherBit (request, response) {

  try {

  let searchQueryCity = request.query.city_name;
  
// TODO: Play with this later to refactor and simplify
  // let params = {
  //   client_id: process.env.WEATHER_API_KEY,
  //   url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryCity}&key=${process.env.WEATHER_API_KEY}&days=3&lat&lon`,
  //   query: searchQueryCity
  // }
  
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryCity}&key=${process.env.WEATHER_API_KEY}&days=3&lat&lon`;
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
    // next(error); // SEND TO app.use down below
    console.log(error);
  }

  
  }

  class Forecast {
    constructor(element) {
      this.date = element.datetime;
      this.description = element.weather.description;
    }
  }
  module.exports = getWeatherBit;