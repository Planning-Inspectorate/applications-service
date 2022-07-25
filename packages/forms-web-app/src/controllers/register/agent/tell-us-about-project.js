const { VIEW } = require('../../../lib/views');
const {
	postRegistrationData,
	postCommentsData
} = require('../../../services/registration.service');
const config = require('../../../config');

function sanitiseFormPostResponse(error, url) {
	this.error = error;
	this.url = url;
}

exports.getComments = async (req, res) => {
	const { comment } = req.session;
	res.render(VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT, { comment });
};

exports.postComments = async (req, res) => {
	const { body } = req;
	const { comment, errors = {}, errorSummary = [], origin } = body;

	const hasErrors = !!errors.comment || Object.keys(errors).length > 0;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	const routes = {
		checkYourAnswers: `/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`,
		registrationComplete: `/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`,
		tellUsAboutProject: VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT
	};

	if (hasErrors) {
		if (originIsSanitiseFormPost) {
			res.send(new sanitiseFormPostResponse(true, routes.tellUsAboutProject));

			return;
		}

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

		if (originIsSanitiseFormPost) {
			res.send(new sanitiseFormPostResponse(false, routes.checkYourAnswers));

			return;
		}

		res.redirect(routes.checkYourAnswers);

		return;
	} else {
		delete body.mode;

		req.session.comment = comment;

		if (mode === 'draft' && config.featureFlag.allowSaveAndExitOption) {
			req.session.mode = 'draft';

			let { ipRefNo } = req.session.behalfRegdata;

			if (!req.session.behalfRegdata.ipRefNo) {
				req.session.behalfRegdata.case_ref = req.session.caseRef;

				const registrationData = JSON.stringify(req.session.behalfRegdata);
				const response = await postRegistrationData(registrationData);

				ipRefNo = response.data;
				req.session.behalfRegdata.ipRefNo = ipRefNo;
			}

			const commentsData = JSON.stringify({
				comments: req.session.comment,
				mode: req.session.mode
			});

			if (commentsData) await postCommentsData(ipRefNo, commentsData);

			if (originIsSanitiseFormPost) {
				res.send(new sanitiseFormPostResponse(false, routes.registrationComplete));

				return;
			}

			res.redirect(routes.registrationComplete);

			return;
		} else {
			req.session.mode = 'final';

			if (originIsSanitiseFormPost) {
				res.send(new sanitiseFormPostResponse(false, routes.checkYourAnswers));

				return;
			}

			res.redirect(routes.checkYourAnswers);

			return;
		}
	}
};
