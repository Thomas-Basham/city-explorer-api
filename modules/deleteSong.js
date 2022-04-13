"use strict";
const axios = require("axios");

async function deleteSong (req, res, next){
  let id = req.params.id;
  try{
    await Song.findByIdAndDelete(id);
    res.send ('Song deleted');
  }catch(error){
    next(error);
  }
}

module.exports = deleteSong; 