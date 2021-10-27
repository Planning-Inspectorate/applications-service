const insertInterestedParty = async (interestedParty) => {
  return { _id: interestedParty.id, uuid: interestedParty.id, interestedParty };
};

module.exports = {
  insertInterestedParty,
};
