const express = require('express');

const {
	getProjectsMapController,
	postProjectsMapController,
	downloadMasterGeoJsonController,
	getMasterGeoJsonController
} = require('./controller');

const {
	addProjectsMapTranslationsMiddleware
} = require('./_middleware/add-projects-map-translations-middleware');

const {
	addCheckboxAccordionTranslationsMiddleware
} = require('../_translations/components/checkbox-accordion/add-checkbox-accordion-translations-middleware');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');

const { getProjectsMapURL } = require('./utils/get-projects-map-url');
const { getGeoJsonDownloadURL } = require('./utils/get-master-geo-json-download-url');
const { getGeoJsonURL } = require('./utils/get-master-geo-json-url');

const router = express.Router();

const projectsMapURL = getProjectsMapURL();
const geoJsonDownloadURL = getGeoJsonDownloadURL();
const geoJsonMapDisplayURL = getGeoJsonURL();

router.get(
	projectsMapURL,
	addCheckboxAccordionTranslationsMiddleware,
	addCommonTranslationsMiddleware,
	addProjectsMapTranslationsMiddleware,
	getProjectsMapController
);

router.post(
	projectsMapURL,
	addCheckboxAccordionTranslationsMiddleware,
	addCommonTranslationsMiddleware,
	addProjectsMapTranslationsMiddleware,
	postProjectsMapController
);

router.get(geoJsonDownloadURL, downloadMasterGeoJsonController);

router.get(geoJsonMapDisplayURL, getMasterGeoJsonController);

module.exports = {
	projectsMapRouter: router
};
