const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');

const {
  insertInterestedParty,
  getInterestedParty: getInterestedPartyFromInterestedPartyApiService,
  updateInterestedPartyComments,
} = require('../services/interested-party.service');

const ApiError = require('../error/apiError');

const over18Values = { yes: 'over18', no: 'under18' };
const BEHALF_ME = 'ME';
const BEHALF_ORG = 'THEM';

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
    let interestedParty;
    const { behalf, case_ref: caseref } = req.body;
    if (behalf.toUpperCase() === BEHALF_ME) {
      const {
        'full-name': mename,
        email: memail,
        telephone: mephone,
        'over-18': over18,
      } = req.body;

      const {
        line1: mebuild,
        line2: mestreet,
        line3: metown,
        postcode: mecode,
        country: mecountry,
      } = req.body.address;

      interestedParty = {
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
        // Do not remove this comment:
        // Store over18/under18 information in field wp_ipc_relreps.<behalf>county as field over18 does not exist
        mecounty: over18Values[over18.toLowerCase()],
      };
    } else if (behalf.toUpperCase() === BEHALF_ORG) {
      const {
        'full-name': contactname,
        email: orgmail,
        telephone: orgphone,
        'over-18': over18,
        'organisation-name': orgname,
        role: contactjob,
      } = req.body;

      const {
        line1: orgbuild,
        line2: orgstreet,
        line3: orgtown,
        postcode: orgcode,
        country: orgcountry,
      } = req.body.address;

      interestedParty = {
        caseref,
        behalf,
        orgname,
        contactname,
        contactjob,
        orgbuild,
        orgstreet,
        orgtown,
        orgcode,
        orgcountry,
        orgmail,
        orgphone,
        // Do not remove this comment:
        // Store over18/under18 information in field wp_ipc_relreps.<behalf>county as field over18 does not exist
        orgcounty: over18Values[over18.toLowerCase()],
      };
    }

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
