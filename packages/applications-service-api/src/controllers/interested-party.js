const uuid = require('uuid');
const logger = require('../lib/logger');

const { insertInterestedParty } = require('../services/interested-party.service');
const { interestedPartyDocument } = require('../models/interested-party');

module.exports = {
  async createInterestedParty(req, res) {
    const interestedParty = JSON.parse(JSON.stringify(interestedPartyDocument));
    interestedParty.id = uuid.v4();

    const now = new Date(new Date().toISOString());
    interestedParty.createdAt = now;
    interestedParty.updatedAt = now;

    logger.debug(`Creating appeal ${interestedParty.id} ...`);

    const document = await insertInterestedParty(interestedParty);

    if (document.result && document.result.ok) {
      logger.debug(`InterestedParty ${interestedParty.id} created`);
      res.status(201).send(interestedParty);
      return;
    }

    logger.error(`Problem while ${interestedParty.id} created`);
    res.status(500).send(interestedParty);
  },
};
