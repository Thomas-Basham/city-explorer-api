"use strict";
const axios = require("axios");
const Song = require("../models/Song");

async function postSong (req, res, next){
  try{
    let createdSong = await Song.create(req.body);
    console.log('created a song')
    res.status(200).send(createdSong);
  } catch(error){
    next(error);
  }
}

module.exports = postSong;