const config = require('../../config');
const examinationSessionStorage = config.sessionStorage.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				applicant: { route: examinationApplicantRoute },
				checkYourAnswers: { route: checkYourAnswersRoute },
				nameAgent: { route: examinationNameAgentRoute },
				nameMyself: { route: examinationNameMyselfRoute },
				nameOrganisation: { route: examinationNameOrganisationRoute },
				submittingFor
			}
		}
	}
} = require('../../routes/config');

const submittingForOptions = {
	1: {
		value: 'myself',
		text: 'Myself'
	},
	2: {
		value: 'organisation',
		text: 'An organisation I work for'
	},
	3: {
		value: 'agent',
		text: 'On behalf of another person, a family group or another organisation I do not work for'
	}
};

const pageData = {
	backLinkUrl: `${examinationDirectory}${examinationApplicantRoute}`,
	id: submittingFor.id,
	options: [submittingForOptions[1], submittingForOptions[2], submittingForOptions[3]],
	pageTitle: submittingFor.name,
	title: submittingFor.name
};

const getSubmittingFor = (req, res) => {
	const setPageData = { ...pageData };

	const examinationSessionSubmitter =
		req?.session?.[examinationSessionStorage.name]?.[examinationSessionStorage.property.submitter];

	if (examinationSessionSubmitter) {
		const submittingForValues = { ...submittingForOptions };

		const updatedSubmittingForValues = Object.keys(submittingForValues).map((option) => {
			const optionChecked = submittingForValues[option].value === examinationSessionSubmitter;

			if (!optionChecked) return submittingForValues[option];

			return {
				...submittingForValues[option],
				checked: 'checked'
			};
		});

		setPageData.options = updatedSubmittingForValues;
	}

	res.render(submittingFor.view, setPageData);
};

const postSubmittingFor = (req, res) => {
	try {
		const { body = {}, session = {} } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[submittingFor.id] || Object.keys(errors).length > 0) {
			res.render(submittingFor.view, {
				...pageData,
				errors,
				errorSummary
			});

			return;
		}

		const submitter = body?.[submittingFor.id];

		if (!submitter) return res.status(404).render('error/not-found');

		const examinationSession = session?.[examinationSessionStorage.name] || {};

		const previousSessionValue = examinationSession[examinationSessionStorage.property.submitter];

		examinationSession[examinationSessionStorage.property.submitter] = submitter;

		if (req?.query?.mode === 'edit' && previousSessionValue === submitter)
			res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
		else if (submittingForOptions[1].value === submitter)
			res.redirect(`${examinationDirectory}${examinationNameMyselfRoute}`);
		else if (submittingForOptions[2].value === submitter)
			res.redirect(`${examinationDirectory}${examinationNameOrganisationRoute}`);
		else if (submittingForOptions[3].value === submitter)
			res.redirect(`${examinationDirectory}${examinationNameAgentRoute}`);
		else res.status(500).render('error/unhandled-exception');
	} catch {
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmittingFor,
	postSubmittingFor
};
