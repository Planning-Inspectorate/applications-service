const { promises: fs } = require('fs');
const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const config = require('../lib/config');

const {
  getApplication: getApplicationFromApplicationApiService,
  getAllApplications: getAllApplicationsFromApplicationApiService,
} = require('../services/application.service');

const ApiError = require('../error/apiError');
const { toInteger } = require('lodash');

const area = ['COUNTRY', 'REGION', 'COUNTY', 'BOROUGH', 'DISTRICT', 'CITY', 'TOWN', 'JUNCTION'];
const MAPZOOMLVL_OFFSET = 5;
const DEFAULT_MAPZOOMLVL = 9;
const DEFAULT_LONGLAT = ['53.8033666', '-2.7044637'];

function addMapZoomLvlAndLongLat(document) {
  const mapZoomLevel = document.MapZoomLevel ? document.MapZoomLevel : 'COUNTRY';
  let LongLat = [...DEFAULT_LONGLAT];
  if (document.LatLong) {
    const latLong = document.LatLong.split(',');
    LongLat = [latLong[1], latLong[0]];
  }

  const application = {
    ...document,
    MapZoomLevel: mapZoomLevel
      ? MAPZOOMLVL_OFFSET + area.indexOf(mapZoomLevel.toUpperCase())
      : MAPZOOMLVL_OFFSET + DEFAULT_MAPZOOMLVL,
    LongLat,
  };
  delete application.LatLong;
  return application;
}

function formatDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const splits = date.split('-');

  const month = months[parseInt(splits[1], 10) - 1];

  return `${splits[2]} ${month} ${splits[0]}`;
}

module.exports = {
  async getApplication(req, res) {
    const { id } = req.params;

    const { trialistPath } = config;
    const trialists = JSON.parse(await fs.readFile(trialistPath, 'utf8'));

    // TODO Temporarily commented
    // if (!trialists.includes(id)) {
    //   throw ApiError.applicationNotAcceptable(id);
    // }

    logger.debug(`Retrieving application ${id} ...`);
    try {
      const document = await getApplicationFromApplicationApiService(id);

      if (document === null) {
        throw ApiError.applicationNotFound(id);
      }

      const application = addMapZoomLvlAndLongLat(document.dataValues);

      application.DateOfRelevantRepresentationCloseFormatted =
        application.DateOfRelevantRepresentationClose
          ? formatDate(application.DateOfRelevantRepresentationClose)
          : null;

      logger.debug(`Application ${id} retrieved`);
      res.status(StatusCodes.OK).send(application);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Problem getting application ${id} \n ${e}`);
    }
  },

  async getAllApplications(req, res) {
    logger.debug(`Retrieving all applications ...`);
    try {
      const documents = await getAllApplicationsFromApplicationApiService();

      if (!documents.length) {
        throw ApiError.noApplicationsFound();
      }

      res.status(StatusCodes.OK).send(
        documents.map((document) => {
          return addMapZoomLvlAndLongLat(document.dataValues);
        })
      );
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Problem getting all applications \n ${e}`);
    }
  },
};
