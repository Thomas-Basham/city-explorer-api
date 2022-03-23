 'use strict';
 console.log('City Explorer Server');

// REQUIRE
// Requirements for server:
const express = require('express'); 
require('dotenv').config();
let data = require('./data/weather.json');

// We must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'

const app = express();
app.use(cors());

// define PORT and validate .env file is working
const PORT = process.env.PORT || 3002; // something is wrong if on 3002

// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get
app.get('/', (request, response) => {
  response.send('This is the server response.send !');
});






// Get our data
app.get('/weather', (req, res) => { 
  try {
  let citySearchQuery = req.query.searchQuery;
  
  let weatherObject = data.find(location => location.city_name.toLowerCase() === citySearchQuery.toLowerCase())
  
  let weatherData = [];
  weatherObject.data.filter ((element) => {
    let selectedCity = new Forecast(element);
    weatherData.push(selectedCity); 
  })

  res.send(weatherData);
  } catch(error) {
    next(error); // SEND TO app.use down below
  }
});

app.get('*', (request, response) => {
  response.send('What you are looking for doesn\'t exist.');
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 



// CLASSES
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}



// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));



