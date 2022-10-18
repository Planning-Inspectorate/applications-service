const { VIEW } = require('../../../lib/views');

exports.getRegistrationSaved = (req, res) => {
	const { email } = req.session.mySelfRegdata;
	const { ipRefNo } = req.session;

	res.render(VIEW.REGISTER.MYSELF.REGISTRATION_SAVED, { ipRefNo, email });
};
