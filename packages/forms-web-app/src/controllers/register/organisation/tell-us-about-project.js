/* eslint-disable no-shadow */
const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');

exports.getComments = async (req, res) => {
	const { comment } = req.session;
	res.render(VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT, { comment });
};

exports.postComments = async (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [], comment } = body;

	if (errors.comment || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT, {
			errors,
			errorSummary,
			comment
		});
		return;
	}

	const mode = req.body.mode ? req.body.mode : req.query.mode;

	if (mode === 'edit') {
		const { comment } = body;
		req.session.comment = comment;
		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		delete body.mode;
		const { comment } = body;
		req.session.comment = comment;
		if (mode === 'draft') {
			req.session.mode = 'draft';

			let { ipRefNo } = req.session.orgRegdata;

			if (!req.session.orgRegdata.ipRefNo) {
				req.session.orgRegdata.case_ref = req.session.caseRef;
				const registrationData = JSON.stringify(req.session.orgRegdata);
				const response = await postRegistrationData(registrationData);
				ipRefNo = response.data;
				req.session.orgRegdata.ipRefNo = ipRefNo;
			}
			const commentsData = JSON.stringify({
				comments: req.session.comment,
				mode: req.session.mode
			});
			if (commentsData) await postCommentsData(ipRefNo, commentsData);
			res.redirect(`/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}`);
		} else {
			req.session.mode = 'final';
			res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
		}
	}
};
