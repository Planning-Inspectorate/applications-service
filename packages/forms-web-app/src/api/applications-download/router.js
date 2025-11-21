const express = require('express');
const logger = require('../../lib/logger');

const { maps: mapsConfig } = require('../../../src/config');
const { getApplicationsDownload } = require('./controller');
const { applicationsDownloadRoute } = require('./config');
const { getMasterGeojson } = require('../geojson/controller');

const applicationsDownloadRouter = express.Router();

applicationsDownloadRouter.get(`/${applicationsDownloadRoute}`, getApplicationsDownload);
applicationsDownloadRouter.get(
	`/geojson`,
	async (req, res, next) => {
		try {
			//caching middleware, TODO: move to separate file

			res.set('Cache-Control', 'public, max-age=0, must-revalidate');

			//just the head request first to get etag and last-modified
			//we laso need a more elegant way to store/get blob url..., but for now:
			const headResponse = await fetch(mapsConfig.geojsonURL, { method: 'HEAD' });

			const etag = headResponse.headers.get('etag');
			const lastModified = headResponse.headers.get('last-modified');

			//check if browser has it cached already, if so return
			if (etag && req.headers['if-none-match'] === etag) {
				logger.info('ETag match, returning cached geojson');
				return res.status(304).send();
			}

			//set etag and last-modified we got from the blob head request, so the above code^ can work next time and return from cache
			if (etag) {
				res.setHeader('etag', etag);
			}
			if (lastModified) {
				res.setHeader('last-modified', lastModified);
			}

			next();
		} catch (error) {
			logger.error('Error caching geojson:', error);
			next(error);
		}
	},
	getMasterGeojson
);

module.exports = { applicationsDownloadRouter };
