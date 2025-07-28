const { VIEW } = require('../../../../../lib/views');
const { postRegistration, putComments } = require('../../../../../lib/application-api-wrapper');
const config = require('../../../../../config');

const view = 'projects/register/_common/about-project/view.njk';
const key = 'organisation';

const getRegisterOrganisationAboutProjectController = (req, res) => {
	const { comment } = req.session;
	return res.render(view, { comment, key });
};

const postRegisterOrganisationAboutProjectController = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [] } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	const routes = {
		checkYourAnswers: `/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`,
		registrationConfirmation: `/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}`
	};

	if (hasErrors) {
		return res.render(view, {
			errors,
			errorSummary,
			comment,
			key
		});
	}

	const mode = req.body.mode ? req.body.mode : req.query.mode;

	if (mode === 'edit') {
		req.session.comment = comment;

		return res.redirect(`${res.locals.baseUrl}${routes.checkYourAnswers}`);
	} else {
		delete body.mode;

		req.session.comment = comment;

		if (mode === 'draft' && config.featureFlag.allowSaveAndExitOption) {
			req.session.mode = 'draft';

			let { ipRefNo } = req.session.orgRegdata;

			if (!req.session.orgRegdata.ipRefNo) {
				req.session.orgRegdata.case_ref = req.session.caseRef;

				const registrationData = JSON.stringify(req.session.orgRegdata);
				const response = await postRegistration(registrationData);

				ipRefNo = response.data;
				req.session.orgRegdata.ipRefNo = ipRefNo;
			}

			const commentsData = JSON.stringify({
				comments: req.session.comment,
				mode: req.session.mode
			});

			if (commentsData) await putComments(ipRefNo, commentsData);

			return res.redirect(`${res.locals.baseUrl}${routes.registrationConfirmation}`);
		} else {
			req.session.mode = 'final';

			return res.redirect(`${res.locals.baseUrl}${routes.checkYourAnswers}`);
		}
	}
};

module.exports = {
	getRegisterOrganisationAboutProjectController,
	postRegisterOrganisationAboutProjectController
};
