const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');

const { getRepresentationsForApplication } = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getRepresentationsForApplication(req, res) {
    const { applicationId, searchTerm } = req.query;
    logger.debug(`Retrieving representations for application ref ${applicationId}`);
    try {
      const representations = await getRepresentationsForApplication(applicationId, searchTerm);

      if (!representations.length) {
        throw ApiError.noRepresentationsFound();
      }

      res.status(StatusCodes.OK).send(representations);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Problem getting representations \n ${e}`);
    }
  },
};
