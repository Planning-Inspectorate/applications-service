const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');
const IPFactory = require('../factories/interested-party/factory');

const {
  insertInterestedParty,
  getInterestedParty: getInterestedPartyFromInterestedPartyApiService,
  updateInterestedPartyComments,
} = require('../services/interested-party.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getInterestedParty(req, res) {
    const { caseRef } = req.params;

    logger.debug(`Retrieving interested party by case reference ${caseRef} ...`);
    try {
      const document = await getInterestedPartyFromInterestedPartyApiService(caseRef);

      if (document === null) {
        throw ApiError.interestedPartyNotFound(caseRef);
      }

      logger.debug(`Interested party for projet ${caseRef} retrieved`);
      res.status(StatusCodes.OK).send(document.dataValues);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      /* istanbul ignore next */
      logger.error(e.message);
      /* istanbul ignore next */
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Problem getting interested party for project ${caseRef} \n ${e}`);
    }
  },

  async createInterestedParty(req, res) {
    const { behalf, case_ref: caseref } = req.body;
    const interestedParty = IPFactory.createIP(behalf).get(req.body);

    const document = await insertInterestedParty(interestedParty);
    if (document) {
      logger.debug(`InterestedParty ${document.ID} created`);
      res.status(StatusCodes.CREATED).send(JSON.stringify(document.ID));
      return;
    }
    /* istanbul ignore next */
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Problem creating interested party for project ${caseref}`);
  },

  async updateComments(req, res) {
    const { ID } = req.params;
    const { comments, mode } = req.body;

    try {
      const update = await updateInterestedPartyComments(ID, comments, mode);

      if (update === 0) {
        throw ApiError.commentsForPartyWithIDNotUpdated(ID);
      }

      res.status(StatusCodes.OK).send();
    } catch (e) {
      /* istanbul ignore next */
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      /* istanbul ignore next */
      logger.error(e.message);
      /* istanbul ignore next */
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Problem updating comments for interested party with ID ${ID} \n ${e}`);
    }
  },
};
