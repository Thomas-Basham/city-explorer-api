"use strict";
const axios = require("axios");

// Get data from API URL
async function getImSea(request, response) {
  try {
    let q = request.query.q;
    let url = `https://imsea.herokuapp.com/api/0?q=${q}`; //TODO change seattle to ${searchQueryCity}// HIDE API KEY

    let imgSearch = await axios.get(url);
    let imgData = [];
    imgData.push(imgSearch.data.results);
    response.send(imgData);
    // console.log(imgData);
  } catch (error) {
    console.log(error);
  }
}

// Class for map function
// class Song {
//   constructor(element) {
//     // this.whatever = element.valueName;
//     this.artistName = element.artistName;
//     this.trackName = element.trackName;
//     this.artWork = element.artworkUrl100;

//   }
// }

module.exports = getImSea;
