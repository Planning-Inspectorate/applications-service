const { VIEW } = require('../../../lib/views');
const { nsipProjectLink } = require('../../../lib/nsip-project-link');

exports.getConfirmation = (req, res) => {
	const { ipRefNo, representor } = req.session.behalfRegdata;
	const { email } = representor;
	if (req.session.mode === 'draft') {
		req.session.ipRefNo = ipRefNo;
		res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_SAVED}`);
	} else {
		res.render(VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE, {
			ipRefNo,
			email,
			nsipProjectLink: nsipProjectLink(req.session.appData)
		});
	}
};
