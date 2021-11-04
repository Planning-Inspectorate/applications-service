const logger = require('../lib/logger');

const {
  getApplication: getApplicationFromApplicationApiService,
  getAllApplications: getAllApplicationsFromApplicationApiService,
} = require('../services/application.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getApplication(req, res) {
    const { id } = req.params;

    logger.debug(`Retrieving application ${id} ...`);
    try {
      const document = await getApplicationFromApplicationApiService(id);

      if (document === null) {
        throw ApiError.applicationNotFound(id);
      }

      logger.debug(`Application ${id} retrieved`);
      res.status(200).send(document.dataValues);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(500).send(`Problem getting the application ${id} \n ${e}`);
    }
  },

  async getAllApplications(req, res) {
    logger.debug(`Retrieving all applications ...`);
    try {
      const documents = await getAllApplicationsFromApplicationApiService();

      res.status(200).send(documents);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(500).send(`Problem getting applications \n ${e}`);
    }
  },
};
