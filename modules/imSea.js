"use strict";
const axios = require("axios");

// Get data from API URL
async function getImSea(request, response) {
  try {
    let q = request.query.q;
    const url = `https://api.unsplash.com/search/photos?query=${q}&per_page=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    let imgSearch = await axios.get(url);
    let imgData = [];
    imgData.push(imgSearch.data.results);
    let urls = imgData[0].map((data) =>{
      // console.log(data.urls.regular)
      return data.urls.regular
    })
    console.log("URLS",urls)
    response.send(urls);
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
