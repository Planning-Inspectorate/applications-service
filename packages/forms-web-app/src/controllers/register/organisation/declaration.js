const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');

exports.getDeclaration = async (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
	let { ipRefNo } = req.session.orgRegdata;

	if (!ipRefNo) {
		req.session.orgRegdata.case_ref = req.session.caseRef;
		req.session.orgRegdata.mode = req.session.mode;
		const registrationData = JSON.stringify(req.session.orgRegdata);
		const response = await postRegistrationData(registrationData);
		ipRefNo = response.data;
		req.session.orgRegdata.ipRefNo = ipRefNo;
	}

	const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
	if (commentsData && Object.keys(JSON.parse(commentsData)).length) {
		await postCommentsData(ipRefNo, commentsData);
	}

	res.redirect(`/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}`);
};
