"use strict";
const axios = require("axios");

// Get data from API URL
async function getItunes(request, response) {
  try {
    let term = request.query.term;
    // let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&page=1`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY
    let url = `https://itunes.apple.com/search?term=${term}&limit=20`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY

    let songSearch = await axios.get(url);
    let songData = [];
    songSearch.data.results.forEach((element) => {
      let selectedSong = new Song(element);
      songData.push(selectedSong);
    });
    response.send(songData);
  } catch (error) {
    console.log(error);
  }
}

// Class for map function
class Song {
  constructor(element) {
    // this.whatever = element.valueName;
    this.artistName = element.artistName;
    this.trackName = element.trackName;
    this.artWork = element.artworkUrl100;

  }
}

module.exports = getItunes;
