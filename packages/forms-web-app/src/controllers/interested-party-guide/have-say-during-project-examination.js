const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validHaveSayDuringProjectExaminationOptions,
} = require('../../validators/interested-party-guide/have-say-during-project-examination');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getHaveSayDuringProjectExamination = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION]: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
    default: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postHaveSayDuringProjectExamination = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const haveSayDuringProjectExamination = body['have-say-during-project-examination'];
  let selectedInterestedParty = null;

  if (validHaveSayDuringProjectExaminationOptions.includes(haveSayDuringProjectExamination)) {
    selectedInterestedParty = haveSayDuringProjectExamination;
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