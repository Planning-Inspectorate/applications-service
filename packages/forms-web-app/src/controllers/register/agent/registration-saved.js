const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
  const { email } = req.session.behalfRegdata;
  const { ipRefNo } = req.session;

  res.render(VIEW.REGISTER.AGENT.REGISTRATION_SAVED, { ipRefNo, email });
};
