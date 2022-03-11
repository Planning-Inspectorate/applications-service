const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
  const { email } = req.session.orgRegdata;
  const { ipRefNo } = req.session;

  res.render(VIEW.REGISTER.ORGANISATION.REGISTRATION_SAVED, { ipRefNo, email });
};
