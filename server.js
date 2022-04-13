"use strict";
console.log("City Explorer Server is Running");

// REQUIRE
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const axios = require("axios");

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Modules
const getWeatherBit = require("./modules/weather");
const getMovies = require("./modules/movies");
const getImSea = require("./modules/imSea");
const getItunes = require("./modules/Itunes");

const getSongs = require("./modules/getSongs");
const postSong = require("./modules/postSong");
const deleteSong = require("./modules/deleteSong");
const putSong = require("./modules/putSong");

// ROUTES
app.get("/", (request, response) => {
  response.send("Welcome to the city explorer server!");
});

// API Endpoints 
app.get("/weather", getWeatherBit);
app.get("/movies", getMovies);
app.get("/imSea", getImSea);
app.get("/Itunes", getItunes);

// Mongo Endpoints
app.get ('/song', getSongs);
app.post ('/song', postSong);
app.delete ('/song', deleteSong);
app.put ('/song', putSong);

// Errors
app.get("*", (request, response) => {
  response.send("This page does not exist");
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

const PORT = process.env.PORT || 3002; // something is wrong if on 3002
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
