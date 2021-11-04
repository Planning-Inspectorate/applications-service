const db = require('../models');

const getInterestedParty = async (caseRef) => {
  const party = await db.InterestedParty.findOne({ where: { caseRef } });
  return party;
};

const insertInterestedParty = async (interestedParty) => {
  const party = await db.InterestedParty.create(interestedParty);
  return party;
};

module.exports = {
  insertInterestedParty,
  getInterestedParty,
};
