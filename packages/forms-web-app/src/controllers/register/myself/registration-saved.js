const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
  const { email } = req.session.mySelfRegdata;
  const { ipRefNo } = req.session;
  delete req.session.comment;
  delete req.session.mySelfRegdata;
  delete req.session.typeOfParty;
  delete req.session.ipRefNo;
  res.render(VIEW.REGISTER.MYSELF.REGISTRATION_SAVED, { ipRefNo, email });
};
