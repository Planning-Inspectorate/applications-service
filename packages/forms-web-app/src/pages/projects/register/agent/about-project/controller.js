const { VIEW } = require('../../../../../lib/views');
const { postRegistration, putComments } = require('../../../../../lib/application-api-wrapper');
const config = require('../../../../../config');

const view = 'projects/register/_common/about-project/view.njk';
const key = 'agent';

const getRegisterAgentAboutProjectController = (req, res) => {
	const { comment } = req.session;
	return res.render(view, { comment, key });
};

const postRegisterAgentAboutProjectController = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [] } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;

	const routes = {
		checkYourAnswers: `/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`,
		registrationComplete: `/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`
	};

	if (hasErrors) {
		res.render(view, {
			errors,
			errorSummary,
			comment,
			key
		});

		return;
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

			let { ipRefNo } = req.session.behalfRegdata;

			if (!req.session.behalfRegdata.ipRefNo) {
				req.session.behalfRegdata.case_ref = req.session.caseRef;

				const registrationData = JSON.stringify(req.session.behalfRegdata);
				const response = await postRegistration(registrationData);

				ipRefNo = response.data;
				req.session.behalfRegdata.ipRefNo = ipRefNo;
			}

			const commentsData = JSON.stringify({
				comments: req.session.comment,
				mode: req.session.mode
			});

			if (commentsData) await putComments(ipRefNo, commentsData);

			return res.redirect(`${res.locals.baseUrl}${routes.registrationComplete}`);
		} else {
			req.session.mode = 'final';
			return res.redirect(`${res.locals.baseUrl}${routes.checkYourAnswers}`);
		}
	}
};

module.exports = {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
};
