const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
  const { email } = req.session.behalfRegdata;
  const { ipRefNo } = req.session;
  delete req.session.comment;
  delete req.session.behalfRegdata;
  delete req.session.typeOfParty;
  delete req.session.ipRefNo;
  res.render(VIEW.REGISTER.AGENT.REGISTRATION_SAVED, { ipRefNo, email });
};
