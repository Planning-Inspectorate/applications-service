const { VIEW } = require('../../../lib/views');
const { nsipProjectLink } = require('../../../lib/nsip-project-link');

exports.getConfirmation = async (req, res) => {
	const { ipRefNo, email } = req.session.orgRegdata;
	if (req.session.mode === 'draft') {
		req.session.ipRefNo = ipRefNo;
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.REGISTRATION_SAVED}`);
	} else {
		res.render(VIEW.REGISTER.ORGANISATION.CONFIRMATION, {
			ipRefNo,
			email,
			nsipProjectLink: nsipProjectLink(req.session.appData)
		});
	}
};
