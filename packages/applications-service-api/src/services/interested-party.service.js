const db = require('../models');
const notify = require('../lib/notify');

const BEHALF_ME = 'ME';
const BEHALF_ORG = 'THEM';

const getInterestedParty = async (caseRef) => {
  const party = await db.InterestedParty.findOne({ where: { caseRef } });
  return party;
};

const insertInterestedParty = async (interestedParty) => {
  const party = await db.InterestedParty.create(interestedParty);
  return party;
};

const updateInterestedPartyComments = async (ID, comments) => {
  const update = await db.InterestedParty.update(
    { therep: JSON.stringify(comments) },
    { where: { ID } }
  );

  const updateStatus = update[0];
  if (updateStatus) {
    const party = await db.InterestedParty.findOne({ where: { ID } });
    const project = await db.Project.findOne({
      where: { CaseReference: party.dataValues.caseref },
    });

    const { behalf } = party.dataValues;
    const { ProjectName: projectName } = project.dataValues;

    let email;
    let ipName;
    let ipRef;

    if (behalf.toUpperCase() === BEHALF_ME) {
      email = party.dataValues.memail;
      ipName = party.dataValues.mename;
      ipRef = `${party.dataValues.ID}`;
    } else if (behalf.toUpperCase() === BEHALF_ORG) {
      email = party.dataValues.orgmail;
      ipName = party.dataValues.contactname;
      ipRef = `${party.dataValues.ID}`;
    }

    await notify.sendIPRegistrationConfirmationEmailToIP({ email, projectName, ipName, ipRef });
    await db.InterestedParty.update({ emailed: new Date() }, { where: { ID } });
  }

  return updateStatus;
};

module.exports = {
  insertInterestedParty,
  getInterestedParty,
  updateInterestedPartyComments,
};
