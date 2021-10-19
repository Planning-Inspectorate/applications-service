const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validGetInvolvedPreliminaryMeetingsOptions,
} = require('../../validators/interested-party-guide/get-involved-preliminary-meetings');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getGetInvolvedPreliminaryMeetings = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION]: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION]: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
    default: VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postGetInvolvedPreliminaryMeetings = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const getInvolvedPreliminaryMeetings = body['get-involved-preliminary-meetings'];
  let selectedInterestedParty = null;

  if (validGetInvolvedPreliminaryMeetingsOptions.includes(getInvolvedPreliminaryMeetings)) {
    selectedInterestedParty = getInvolvedPreliminaryMeetings;
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