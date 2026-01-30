const express = require('express');

const { applicationsDownloadRouter } = require('./applications-download/router');
const { projectsMapRouter } = require('./projects-map/router');
const osMapsRouter = require('./os-maps/router');
const { redisCacheRouter } = require('./redis-cache/router');

const apiRouter = express.Router();

apiRouter.use(applicationsDownloadRouter);
apiRouter.use(projectsMapRouter);
apiRouter.use(osMapsRouter);
apiRouter.use(redisCacheRouter)

module.exports = { apiRouter };
