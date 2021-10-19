const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validAfterMakingTheDecisionOptions,
} = require('../../validators/interested-party-guide/after-making-the-decision');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getAfterMakingTheDecision = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    default: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postAfterMakingTheDecision = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const afterMakingTheDecision = body['after-making-the-decision'];
  let selectedInterestedParty = null;

  if (validAfterMakingTheDecisionOptions.includes(afterMakingTheDecision)) {
    selectedInterestedParty = afterMakingTheDecision;
  }

  if (Object.keys(errors).length > 0) {
    res.render(forwardPage('default'), {
      type: selectedInterestedParty,
      errors,
      errorSummary,
    });
    return;
  }

  res.redirect(`/${forwardPage(selectedInterestedParty)}`);
}