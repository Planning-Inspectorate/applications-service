const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');
const config = require('../../../config');

exports.getComments = (req, res) => {
	const { comment } = req.session;
	res.render(VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT, { comment });
};

exports.postComments = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [] } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	const routes = {
		checkYourAnswers: `/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`,
		registrationComplete: `/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}`,
		tellUsAboutProject: VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT
	};

	if (hasErrors) {
		res.render(routes.tellUsAboutProject, {
			errors,
			errorSummary,
			comment
		});

		return;
	}

	const mode = req.body.mode ? req.body.mode : req.query.mode;

	if (mode === 'edit') {
		req.session.comment = comment;

		res.redirect(routes.checkYourAnswers);

		return;
	} else {
		delete body.mode;

		req.session.comment = comment;

		if (mode === 'draft' && config.featureFlag.allowSaveAndExitOption) {
			req.session.mode = 'draft';

			let { ipRefNo } = req.session.mySelfRegdata;

			if (!req.session.mySelfRegdata.ipRefNo) {
				req.session.mySelfRegdata.case_ref = req.session.caseRef;

				const registrationData = JSON.stringify(req.session.mySelfRegdata);
				const response = await postRegistrationData(registrationData);

				ipRefNo = response.data;
				req.session.mySelfRegdata.ipRefNo = ipRefNo;
			}

			const commentsData = JSON.stringify({
				comments: req.session.comment,
				mode: req.session.mode
			});

			if (commentsData) await postCommentsData(ipRefNo, commentsData);

			res.redirect(routes.registrationComplete);

			return;
		} else {
			req.session.mode = 'final';

			res.redirect(routes.checkYourAnswers);

			return;
		}
	}
};
