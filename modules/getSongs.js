"use strict";
const axios = require("axios");

async function getSongs(req, res, next){
  try{
    let results = await Song.find();
    res.status(200).send(results);
  } catch(error){
    next(error);
  }
}
module.exports = getSongs;