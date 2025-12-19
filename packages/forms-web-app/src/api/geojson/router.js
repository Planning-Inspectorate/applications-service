const express = require('express');
const { getGeoJsonController, getBoundariesController } = require('./controller');
const { geojsonApiRoute, boundariesApiRoute } = require('./config');

const geojsonRouter = express.Router();

geojsonRouter.get(geojsonApiRoute, getGeoJsonController);
geojsonRouter.get(boundariesApiRoute, getBoundariesController);

module.exports = { geojsonRouter };
