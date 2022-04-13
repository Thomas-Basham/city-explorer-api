"use strict";
const axios = require("axios");

async function putSong (req, res, next){
  try{
    let id = req.params.id;
    let updatedSong = await Song.findByIdAndUpdate(id, req.body, {new: true, overwrite: true});
    res.status(200).send(updatedSong);
  }catch(error){
    next(error);
  }
}

module.exports = putSong;