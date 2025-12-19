const express = require('express');

const { applicationsDownloadRouter } = require('./applications-download/router');
const { geojsonRouter } = require('./geojson/router');

const apiRouter = express.Router();

apiRouter.use(applicationsDownloadRouter);
apiRouter.use(geojsonRouter);

module.exports = { apiRouter };
