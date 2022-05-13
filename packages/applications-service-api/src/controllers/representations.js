/* eslint-disable no-nested-ternary */
const { StatusCodes } = require('http-status-codes');
const { unslugify } = require('unslugify');

const logger = require('../lib/logger');
const config = require('../lib/config');

const {
  getRepresentationsForApplication,
  getFilters,
} = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getRepresentationsForApplication(req, res) {
    const { applicationId, page, searchTerm, type } = req.query;

    const types = type instanceof Array ? [...type] : type ? [type] : [];

    logger.debug(`Retrieving representations for application ref ${applicationId}`);
    try {
      const representations = await getRepresentationsForApplication(
        applicationId,
        page || 1,
        searchTerm,
        types && types.map((t) => unslugify(t))
      );

      if (!representations.rows.length) {
        throw ApiError.noRepresentationsFound();
      }

      const typeFilters = await getFilters('RepFrom', applicationId);

      const { itemsPerPage } = config;
      const totalItems = representations.count;

      const wrapper = {
        representations: representations.rows,
        totalItems,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage: page,
        filters: {
          typeFilters: typeFilters
            ? typeFilters.map((f) => ({
                name: f.dataValues.RepFrom,
                count: f.dataValues.count,
              }))
            : [],
        },
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
