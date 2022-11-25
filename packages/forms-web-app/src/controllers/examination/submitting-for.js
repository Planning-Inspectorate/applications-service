const { isQueryModeEdit } = require('../utils/is-query-mode-edit');
const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				isApplicant,
				checkYourAnswers: { route: checkYourAnswersRoute },
				nameAgent: { route: examinationNameAgentRoute },
				nameMyself: { route: examinationNameMyselfRoute },
				nameOrganisation: { route: examinationNameOrganisationRoute },
				submittingFor,
				yourInterestedPartyNumber: { route: yourInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	id: submittingFor.id,
	options: [submittingFor.options[1], submittingFor.options[2], submittingFor.options[3]],
	pageTitle: submittingFor.name,
	title: submittingFor.name
};

const setBackLinkUrl = (examinationSession) => {
	const isApplicantValue = examinationSession[examinationSessionStorage.property.applicant];

	if (isApplicantValue === isApplicant.options[2].value) {
		return (pageData.backLinkUrl = `${examinationDirectory}${isApplicant.route}`);
	}

	const interestedPartyNumber =
		examinationSession[examinationSessionStorage.property.interestedPartyNumber];

	if (interestedPartyNumber) {
		return (pageData.backLinkUrl = `${examinationDirectory}${yourInterestedPartyNumberRoute}`);
	}
};

const getSubmittingFor = (req, res) => {
	const examinationSession = req?.session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	setBackLinkUrl(examinationSession);

	const setPageData = { ...pageData };

	const examinationSessionSubmitter =
		examinationSession?.[examinationSessionStorage.property.submittingFor];

	if (examinationSessionSubmitter) {
		const submittingForValues = { ...submittingFor.options };

		const updatedSubmittingForValues = Object.keys(submittingForValues).map(
			(submittingForValue) => {
				const valueChecked =
					submittingForValues[submittingForValue].value === examinationSessionSubmitter;

				if (!valueChecked) return submittingForValues[submittingForValue];

				return {
					...submittingForValues[submittingForValue],
					checked: 'checked'
				};
			}
		);

		setPageData.options = updatedSubmittingForValues;
	}

	res.render(submittingFor.view, setPageData);
};

const postSubmittingFor = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[submittingFor.id] || Object.keys(errors).length > 0) {
		setBackLinkUrl(examinationSession);

		res.render(submittingFor.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const setSubmittingFor = body?.[submittingFor.id];

	if (!setSubmittingFor) return res.status(404).render('error/not-found');

	const isValidValue = Object.keys(submittingFor.options).find((submittingForOption) => {
		return submittingFor.options[submittingForOption].value === setSubmittingFor;
	});

	if (!isValidValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.submittingFor] = setSubmittingFor;

	if (isQueryModeEdit(query)) res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
	else if (submittingFor.options[1].value === setSubmittingFor)
		res.redirect(`${examinationDirectory + examinationNameMyselfRoute}`);
	else if (submittingFor.options[2].value === setSubmittingFor)
		res.redirect(`${examinationDirectory + examinationNameOrganisationRoute}`);
	else if (submittingFor.options[3].value === setSubmittingFor)
		res.redirect(`${examinationDirectory + examinationNameAgentRoute}`);
};

module.exports = {
	getSubmittingFor,
	postSubmittingFor
};
