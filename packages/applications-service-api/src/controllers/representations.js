const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const config = require('../lib/config');

const { getRepresentationsForApplication } = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getRepresentationsForApplication(req, res) {
    const { applicationId, page, searchTerm } = req.query;
    const selectedPage = page || 1;
    logger.debug(`Retrieving representations for application ref ${applicationId}`);
    try {
      const representations = await getRepresentationsForApplication(
        applicationId,
        selectedPage,
        searchTerm
      );

      const { itemsPerPage } = config;
      const totalItems = representations.count;

      const wrapper = {
        representations: representations.rows,
        totalItems,
        itemsPerPage,
        totalPages: Math.ceil(Math.max(totalItems, 1) / itemsPerPage),
        currentPage: selectedPage,
      };

      res.status(StatusCodes.OK).send(wrapper);
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
