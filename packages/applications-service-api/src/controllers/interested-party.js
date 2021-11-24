const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');

const {
  insertInterestedParty,
  getInterestedParty: getInterestedPartyFromInterestedPartyApiService,
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
      logger.error(e.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Problem getting interested party for project ${caseRef} \n ${e}`);
    }
  },

  async createInterestedParty(req, res) {
    const {
      case_ref: caseref,
      behalf,
      'full-name': mename,
      email: memail,
      telephone: mephone,
    } = req.body;

    const {
      line1: mebuild,
      line2: mestreet,
      line3: metown,
      postcode: mecode,
      country: mecountry,
    } = req.body.address;

    const interestedParty = {
      caseref,
      behalf,
      mename,
      memail,
      mephone,
      mebuild,
      mestreet,
      metown,
      mecode,
      mecountry,
    };

    const document = await insertInterestedParty(interestedParty);
    if (document) {
      logger.debug(`InterestedParty ${document.ID} created`);
      res.status(StatusCodes.CREATED).send(JSON.stringify(document.ID));
      return;
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Problem creating interested party for project ${caseref}`);
  },
};
