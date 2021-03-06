/* eslint-disable camelcase */
const { VIEW } = require('../../lib/views');
const { postAuthToken } = require('../../services/registration.service');
const { nsipProjectLink } = require('../../lib/nsip-project-link');

exports.getConfirmEmail = async (req, res) => {
	res.render(VIEW.REGISTER.CONFIRM_EMAIL);
};

exports.postConfirmEmail = async (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors.email || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.CONFIRM_EMAIL, {
			errors,
			errorSummary
		});
		return;
	}
	const { token } = req.query;
	const email = JSON.stringify({ email: body.email });

	const response = await postAuthToken(token, email);
	if (response.resp_code === 404) {
		res.redirect(`/${VIEW.REGISTER.TOKEN_EMAIL_NOT_VERIFIED}?token=${token}`);
	} else {
		const { personal_data, comments, submissionPeriodClosed, projectData } = response.data;

		if (submissionPeriodClosed === true) {
			res.render(VIEW.REGISTER.MISSED_DEADLINE, {
				nsipProjectLink: nsipProjectLink(projectData),
				projectData
			});
		} else {
			const type = personal_data.behalf;
			req.session.comments = comments;
			req.session.comment = comments;

			if (type === 'me') {
				req.session.mySelfRegdata = personal_data;
				res.redirect(`/${VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT}`);
			} else if (type === 'them') {
				req.session.orgRegdata = personal_data;
				res.redirect(`/${VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT}`);
			} else if (type === 'you') {
				req.session.behalfRegdata = personal_data;
				res.redirect(`/${VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT}`);
			}
		}
	}
};
