require('dotenv').config();

module.exports = {
  env: {
    REACT_APP_IP_SEARCH: process.env.REACT_APP_IP_SEARCH,
    REACT_APP_MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  },
};
