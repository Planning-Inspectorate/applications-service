const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');

exports.getDeclaration = (req, res) => {
	res.render(VIEW.REGISTER.MYSELF.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
	let { ipRefNo } = req.session.mySelfRegdata;
	try {
		if (!ipRefNo) {
			req.session.mySelfRegdata.case_ref = req.session.caseRef;
			req.session.mySelfRegdata.mode = req.session.mode;
			const registrationData = JSON.stringify(req.session.mySelfRegdata);
			const response = await postRegistrationData(registrationData);
			ipRefNo = response.data;
			req.session.mySelfRegdata.ipRefNo = ipRefNo;
		}

		const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
		if (commentsData && Object.keys(JSON.parse(commentsData)).length) {
			await postCommentsData(ipRefNo, commentsData);
		}
	} catch (e) {
		req.log.error(e, 'Could not Post declaration, internal error occurred');
		return res.status(500).render('error/unhandled-exception');
	}

	res.redirect(`/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}`);
};
