const { StatusCodes } = require('http-status-codes');
const crypto = require('../lib/crypto');

const logger = require('../lib/logger');
const IPFactory = require('../factories/interested-party/factory');
const consts = require('../factories/interested-party/const');

const {
  insertInterestedParty,
  getInterestedParty: getInterestedPartyFromInterestedPartyApiService,
  updateInterestedPartyComments,
  getInterestedPartyById: getInterestedPartyFromInterestedPartyApiServiceById,
} = require('../services/interested-party.service');
const {
  getApplication: getApplicationFromApplicationApiService,
} = require('../services/application.service');
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
      await updateInterestedPartyComments(ID, comments, mode);

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

  async confirmEmailAddress(req, res) {
    const { token } = req.params;
    const { email } = req.body;

    const ID = crypto.decrypt(token);
    logger.debug(`Retrieving interested party by ID ${ID} ...`);

    try {
      const document = await getInterestedPartyFromInterestedPartyApiServiceById(ID);

      if (document === null) {
        throw ApiError.interestedPartyNotFoundByID(ID);
      }
      logger.debug(`Interested party ${ID} retrieved`);
      const party = document.dataValues;
      const { behalf, memail, orgmail, agmail, youmail, caseref } = party;

      let ipMail;
      if (behalf.toUpperCase() === consts.behalfs.own) {
        ipMail = memail;
      } else if (behalf.toUpperCase() === consts.behalfs.org) {
        ipMail = orgmail;
      } else if (behalf.toUpperCase() === consts.behalfs.agent) {
        ipMail = agmail || youmail;
      }
      if (email !== ipMail) {
        throw ApiError.interestedPartyNotFoundByID(ID);
      }
      const project = await getApplicationFromApplicationApiService(caseref);

      if (project === null) {
        throw ApiError.applicationNotFound(caseref);
      }

      const { DateOfRelevantRepresentationClose } = project.dataValues;

      const repCloseDate = new Date(DateOfRelevantRepresentationClose);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const submissionPeriodClosed = repCloseDate < currentDate;

      const interestedParty = IPFactory.createIP(behalf).map(party);
      res.status(StatusCodes.OK).send({ ...interestedParty, submissionPeriodClosed });
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
