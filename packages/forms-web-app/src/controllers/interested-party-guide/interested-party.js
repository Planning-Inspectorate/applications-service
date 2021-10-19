const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validInterestedPartyOptions,
} = require('../../validators/interested-party-guide/interested-party');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getInterestedParty = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_PRE_APPLICATION]: VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.REGISTER_TO_HAVE_YOUR_SAY]: VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS]: VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION]: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION]: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
    default: VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postInterestedParty = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const interestedParty = body['interested-party'];
  let selectedInterestedParty = null;

  if (validInterestedPartyOptions.includes(interestedParty)) {
    selectedInterestedParty = interestedParty;
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