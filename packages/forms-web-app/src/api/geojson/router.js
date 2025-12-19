const express = require('express');
const { getGeoJsonController, getBoundariesController } = require('./controller');

const geojsonRouter = express.Router();

geojsonRouter.get('/geojson', getGeoJsonController);
geojsonRouter.get('/geojson/boundaries', getBoundariesController);

module.exports = { geojsonRouter };
