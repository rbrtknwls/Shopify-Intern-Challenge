/*
======= Weather API wrapper =====
The idea for this file is to be a wrapper for the OpenWeather API, we want to convert the strings of city names into a form that the external api can accept.
*/

const axios = require('axios');

module.exports = {
  
  update_city_weather: async function (database) {
    
    for (var idx = 0; idx < database.length; idx++) {
      var element = database[idx];
      var position = convert_to_position(element.CITY);

      var response = await send_request(position);

      if (response.status == 200) {
        database[idx].WEATHER = response.data.weather[0].description;
      } else {
        database[idx].WEATHER = "API failed."
      }

        
    }
  }
  
};

/* Private functions */

function convert_to_position(cityName){

  if (cityName == "Toronto") { return ["43.70011","-79.4163"] }
  else if (cityName == "New York") { return ["40.7648","-73.9808"] }
  else if (cityName == "Los Angeles") { return ["34.052235","-118.243683"] }
  else if (cityName == "Berlin") { return ["52.520008","13.404954"] }
  else { return ["22.396428","114.109497"] }
  
}

async function send_request(params){
  
  return await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + params[0] + "&lon=" + params[1] + "&appid=ba8c79228496897f9492acc60f8a9b5d");
}