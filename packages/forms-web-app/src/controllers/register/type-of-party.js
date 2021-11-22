const { VIEW } = require('../../lib/views');
const registrationData = require('../../lib/registration-data.json');
const {
  validTypeOfPartyOptions,
} = require('../../validators/register/type-of-party');
const { REGISTER } = require('../../constants');

exports.getTypeOfParty = async (req, res) => {
  res.render(VIEW.REGISTER.TYPE_OF_PARTY, {type: req.session.typeOfParty});
};

const forwardPage = (partyType) => {
  const party = {
    [REGISTER.TYPE_OF_PARTY.MY_SAY]: VIEW.REGISTER.MYSELF.FULL_NAME,
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

  req.session.typeOfParty = typeOfParty;
  if (typeOfParty === 'myself') {
    req.session.mySelfRegdata = registrationData.myself;
  }

  res.redirect(`/${forwardPage(selectedParty)}`);
}
