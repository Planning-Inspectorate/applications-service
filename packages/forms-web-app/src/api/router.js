const express = require('express');

const { applicationsDownloadRouter } = require('./applications-download/router');
const { projectsMapRouter } = require('./projects-map/router');
const { mapTileRouter } = require('./map-tile/router');
const osMapsRouter = require('./os-maps/router');

const apiRouter = express.Router();

apiRouter.use(applicationsDownloadRouter);
apiRouter.use(projectsMapRouter);
apiRouter.use('/map-tile', mapTileRouter);
apiRouter.use('/os-maps', osMapsRouter);

module.exports = { apiRouter };
