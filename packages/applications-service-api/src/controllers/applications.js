const logger = require('../lib/logger');

const {
  getApplication: getApplicationFromApplicationApiService,
} = require('../services/application.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getApplication(req, res) {
    const idParam = req.params.id;

    logger.debug(`Retrieving application ${idParam} ...`);
    try {
      const document = await getApplicationFromApplicationApiService(idParam);

      if (document === null) {
        throw ApiError.applicationNotFound(idParam);
      }

      logger.debug(`Application ${idParam} retrieved`);
      res.status(200).send(document.application);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(500).send(`Problem getting the application ${idParam}\n${e}`);
    }
  },
};
