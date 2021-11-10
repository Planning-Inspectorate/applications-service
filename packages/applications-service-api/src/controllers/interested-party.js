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
      res.status(200).send(document.dataValues);
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(500).send(`Problem getting interested party for project ${caseRef} \n ${e}`);
    }
  },

  async createInterestedParty(req, res) {
    const interestedParty = req.body;
    delete interestedParty.ID;

    const document = await insertInterestedParty(interestedParty);
    if (document) {
      logger.debug(`InterestedParty ${document.ID} created`);
      res.status(201).send(document);
      return;
    }

    res.status(500).send(interestedParty);
  },
};
