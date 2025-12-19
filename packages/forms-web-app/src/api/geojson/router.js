const express = require('express');
const { getGeoJsonController } = require('./controller');

const geojsonRouter = express.Router();

geojsonRouter.get('/geojson', getGeoJsonController);

module.exports = { geojsonRouter };
