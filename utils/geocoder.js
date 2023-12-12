const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.MAP_DECODER,
  httpAdapter: 'https',
  apiKey: process.env.MAP_DECODER_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;