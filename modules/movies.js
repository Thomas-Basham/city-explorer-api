'use strict';
const axios = require('axios');

// Get data from TMDB
async function getMovies (request, response) {

  try {

  let cityQuery = request.query.city_name;
  
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityQuery}&page=1`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY
  let movieTimes = await axios.get(url);
    
  let movieData = [];
  movieTimes.data.results.forEach ((element) => {
      let selectedCity = new MovieTimes(element);
      movieData.push(selectedCity); 
    });
    response.send(movieData);

    console.log(movieData);

    } catch(error) {

      // next(error); // SEND TO app.use down below
      console.log(error);
    }
  }

// Class
class MovieTimes {
  constructor(element) {
    // this.results = element.results;  
    this.title = element.title; 
    this.released = element.release_date;
    this.posterPath = element.poster_path;
    
    // this.description = element.weather.description;
  }
}


module.exports = getMovies;