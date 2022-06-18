const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = async (req, res) => {
	const { email } = req.session.behalfRegdata.representor;
	const { ipRefNo } = req.session;

	res.render(VIEW.REGISTER.AGENT.REGISTRATION_SAVED, { ipRefNo, email });
};
