const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=61284e05ac77e894debe98fef2b8fb37&query=" +
    latitude +
    "," +
    longitude;
  request(url, function (error, response, body) {
    const data = JSON.parse(body);
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (data.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${data.current.weather_descriptions[0]} It is currently ${data.current.temperature} degree but it feels like ${data.current.feelslike} degree`
      );
    }
  });
};

module.exports = forecast;
