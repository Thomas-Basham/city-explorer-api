'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
mongoose.connect(process.env.DB_URL);

async function seed() {
  await Song.create({
    artist: "As I Lay Dying",
    track: "Undefined",
    artwork: "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/24/b0/ef/24b0efad-2aa0-bc5f-ddcc-73003c68f216/source/100x100bb.jpg",
    email: "bashamtg@gmail.com"
  });
  mongoose.disconnect();
}

seed();
