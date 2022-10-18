const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');

exports.getDeclaration = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
	let { ipRefNo } = req.session.behalfRegdata;

	try {
		if (!ipRefNo) {
			req.session.behalfRegdata.case_ref = req.session.caseRef;
			req.session.behalfRegdata.mode = req.session.mode;
			const registrationData = JSON.stringify(req.session.behalfRegdata);
			const response = await postRegistrationData(registrationData);
			ipRefNo = response.data;
			req.session.behalfRegdata.ipRefNo = ipRefNo;
		}

		const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
		if (commentsData && Object.keys(JSON.parse(commentsData)).length) {
			await postCommentsData(ipRefNo, commentsData);
		}
	} catch (e) {
		req.log.error(e, 'Could not Post declaration, internal error occurred');
		return res.status(500).render('error/unhandled-exception');
	}

	res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`);
};
