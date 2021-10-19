const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validHaveSayPreApplicationOptions,
} = require('../../validators/interested-party-guide/have-say-pre-application');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getHaveSayPreApplication = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.REGISTER_TO_HAVE_YOUR_SAY]: VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS]: VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION]: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION]: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
    default: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postHaveSayPreApplication = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const haveSayPreApplication = body['have-say-pre-application'];
  let selectedInterestedParty = null;

  if (validHaveSayPreApplicationOptions.includes(haveSayPreApplication)) {
    selectedInterestedParty = haveSayPreApplication;
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