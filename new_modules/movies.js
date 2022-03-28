// 'use strict';
// const axios = require('axios');

// let cache = require('./cache.js');
// module.exports = getMovies;


// async function getMovies(city) {
//   const key = 'movie-' + city;
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&page=1`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY
    
//   if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache hit');
//   } else {
//     console.log('Cache miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = await axios.get(url)
//     .then(response => parseMovies(response.data));
//   }
  
//   return cache[key].data;
// }

// function parseMovies(element) {
//   // console.log(movieData);
//   try {
//     const movieSummaries = element.data.map(element => {
//       return new Movie(element);
//     });
//     console.log(movieSummaries);

//     return Promise.resolve(movieSummaries);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }



// // Class
// class Movie {
//   constructor(element) {
//     // this.results = element.results;  
//     this.title = element.title; 
//     this.released = element.release_date;
//     this.posterPath = element.poster_path;
    
//   }
// }


// module.exports = getMovies;
