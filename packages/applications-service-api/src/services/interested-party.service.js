const db = require('../models');
const notify = require('../lib/notify');
const crypto = require('../lib/crypto');
const IPFactory = require('../factories/interested-party/factory');
const { formatDate } = require('../utils/date-utils');
const logger = require('../lib/logger');

const MODE_DRAFT = 'DRAFT';
const MODE_FINAL = 'FINAL';

const insertInterestedParty = async (interestedParty) => {
  const party = await db.InterestedParty.create(interestedParty);
  return party;
};

const updateInterestedPartyComments = async (ID, comments, mode) => {
  const party = await db.InterestedParty.findOne({ where: { ID } });

  if (party.therep !== comments) {
    logger.debug(`Update IP comments for party id ${ID} as ${comments}`);
    await db.InterestedParty.update({ therep: comments }, { where: { ID } });
  }

  const caseRef = party.dataValues.caseref;
  const project = await db.Project.findOne({
    where: { CaseReference: caseRef },
  });

  const { behalf } = party.dataValues;
  const { ProjectName: projectName, DateOfRelevantRepresentationClose: repCloseDate } =
    project.dataValues;

  const { email, ipName, ipRef } = IPFactory.createIP(behalf).getEmailingDetails(party.dataValues);
  if (mode && mode.toUpperCase() === MODE_FINAL) {
    await notify.sendIPRegistrationConfirmationEmailToIP({ email, projectName, ipName, ipRef });
    await db.InterestedParty.update({ emailed: new Date() }, { where: { ID } });
  } else if (mode && mode.toUpperCase() === MODE_DRAFT) {
    const token = crypto.encrypt(ID);
    await notify.sendMagicLinkToIP({
      email,
      ipName,
      projectName,
      repCloseDate: formatDate(repCloseDate),
      token,
      ipRef,
    });
  }
};

const getInterestedPartyById = async (ID) => {
  const party = await db.InterestedParty.findOne({ where: { ID } });
  return party;
};

module.exports = {
  insertInterestedParty,
  updateInterestedPartyComments,
  getInterestedPartyById,
};
