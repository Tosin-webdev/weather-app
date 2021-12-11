const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?limit=2&access_token=pk.eyJ1IjoicGVyc2lhMDEiLCJhIjoiY2t3dXZ6NXQwMXU1YzJwcDM3bmFwZ245MyJ9.vksW1pwCDkS4an2fZ4cOUw";
  request(url, function (error, response, body) {
    const data = JSON.parse(body);
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (!data.features) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
