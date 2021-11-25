const db = require('../models');

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

  return update[0];
};

module.exports = {
  insertInterestedParty,
  getInterestedParty,
  updateInterestedPartyComments,
};
