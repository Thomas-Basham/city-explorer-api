"use strict";

// Dotenv
require("dotenv").config();
console.log("City Explorer Server is Running");

// REQUIRE
// Requirements for server:
// Express takes 2 steps: 'require" and 'use.'
const express = require("express");
const app = express();

// We must include cors if we want to share resources over the web
const cors = require("cors");

// Bring in Axios
const axios = require("axios");

const getWeatherBit = require("./modules/weather");
const getMovies = require("./modules/movies");

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import."

app.use(cors());

// define PORT and validate .env file is working
const PORT = process.env.PORT || 3002; // something is wrong if on 3002

// ROUTES
// We will write our endpoints here

// Server
app.get("/", (request, response) => {
  response.send("Welcome to the city explorer server!");
});

// Get our data from Weatherbit API
app.get("/weather", getWeatherBit);

// GET OUR MOVIE DATA
app.get("/movies", getMovies);

// Error
app.get("*", (request, response) => {
  response.send("This page does not exist");
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
