const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
  const { email } = req.session.orgRegdata;
  const { ipRefNo } = req.session;
  delete req.session.comment;
  delete req.session.orgRegdata;
  delete req.session.typeOfParty;
  delete req.session.ipRefNo;
  res.render(VIEW.REGISTER.ORGANISATION.REGISTRATION_SAVED, { ipRefNo, email });
};
