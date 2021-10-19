const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

const {
  validRegisterToHaveYourSayOptions,
} = require('../../validators/interested-party-guide/register-to-have-your-say');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

exports.getRegisterToHaveYourSay = async (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY);
};

const forwardPage = (interestedPartyType) => {
  const interestedParty = {
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS]: VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION]: VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION,
    [INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION]: VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION,
    default: VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
  };
  return interestedParty[interestedPartyType] || interestedParty.default;
};

exports.forwardPage = forwardPage;

exports.postRegisterToHaveYourSay = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const registerToHaveYourSay = body['register-to-have-your-say'];
  let selectedInterestedParty = null;

  if (validRegisterToHaveYourSayOptions.includes(registerToHaveYourSay)) {
    selectedInterestedParty = registerToHaveYourSay;
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