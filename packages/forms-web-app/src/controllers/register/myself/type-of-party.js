const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

const {
  validTypeOfPartyOptions,
} = require('../../../validators/register/myself/type-of-party');
const { REGISTER } = require('../../../constants');

exports.getTypeOfParty = async (req, res) => {
  res.render(VIEW.REGISTER.TYPE_OF_PARTY, {type: req.session.registrationData['type-of-party']});
};

const forwardPage = (partyType) => {
  const party = {
    [REGISTER.TYPE_OF_PARTY.MY_SAY]: VIEW.REGISTER.FULL_NAME,
    [REGISTER.TYPE_OF_PARTY.ORGANISATION]: VIEW.REGISTER.TEST2,
    [REGISTER.TYPE_OF_PARTY.BEHALF_OF_ORGANISATION]: VIEW.REGISTER.TEST3,
    default: VIEW.REGISTER.TYPE_OF_PARTY,
  };
  return party[partyType] || party.default;
};

exports.forwardPage = forwardPage;

exports.postTypeOfParty = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  const typeOfParty = body['type-of-party'];
  let selectedParty = null;
  req.session.registrationData['type-of-party'] = typeOfParty;

  if (validTypeOfPartyOptions.includes(typeOfParty)) {
    selectedParty = typeOfParty;
  }

  if (Object.keys(errors).length > 0) {
    res.render(forwardPage('default'), {
      type: selectedParty,
      errors,
      errorSummary,
    });
    return;
  }

  res.redirect(`/${forwardPage(selectedParty)}`);
}
