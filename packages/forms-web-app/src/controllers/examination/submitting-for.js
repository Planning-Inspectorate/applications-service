const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				applicant: { route: examinationApplicantRoute },
				checkYourAnswers: { route: checkYourAnswersRoute },
				hasInterestedPartyNumber,
				nameAgent: { route: examinationNameAgentRoute },
				nameMyself: { route: examinationNameMyselfRoute },
				nameOrganisation: { route: examinationNameOrganisationRoute },
				submittingFor,
				yourInterestedPartyNumber: { route: yourInterestedPartyNumberRoute }
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
	backLinkUrl: '',
	id: submittingFor.id,
	options: [submittingForOptions[1], submittingForOptions[2], submittingForOptions[3]],
	pageTitle: submittingFor.name,
	title: submittingFor.name
};

const setBackLinkUrl = (interestedPartyNo) => {
	if (interestedPartyNo === hasInterestedPartyNumber.options[1].value) {
		pageData.backLinkUrl = `${examinationDirectory}${examinationApplicantRoute}`;
	} else if (interestedPartyNo === hasInterestedPartyNumber.options[2].value) {
		pageData.backLinkUrl = `${examinationDirectory}${yourInterestedPartyNumberRoute}`;
	}
};

const getSubmittingFor = (req, res) => {
	const examinationSession = req?.session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const examinationSessionHasInterestedPartyNo =
		examinationSession?.[examinationSessionStorage.property.hasInterestedPartyNo];

	if (!examinationSessionHasInterestedPartyNo) return res.status(404).render('error/not-found');

	setBackLinkUrl(examinationSessionHasInterestedPartyNo);

	const setPageData = { ...pageData };

	const examinationSessionSubmitter =
		examinationSession?.[examinationSessionStorage.property.submittingFor];

	if (examinationSessionSubmitter) {
		const submittingForValues = { ...submittingForOptions };

		const updatedSubmittingForValues = Object.keys(submittingForValues).map((value) => {
			const valueChecked = submittingForValues[value].value === examinationSessionSubmitter;

			if (!valueChecked) return submittingForValues[value];

			return {
				...submittingForValues[value],
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
		const examinationSession = session?.[examinationSessionStorage.name];

		if (!examinationSession) return res.status(404).render('error/not-found');

		const examinationSessionHasInterestedPartyNo =
			examinationSession?.[examinationSessionStorage.property.hasInterestedPartyNo];

		if (!examinationSessionHasInterestedPartyNo) return res.status(404).render('error/not-found');

		if (errors[submittingFor.id] || Object.keys(errors).length > 0) {
			setBackLinkUrl(examinationSessionHasInterestedPartyNo);

			res.render(submittingFor.view, {
				...pageData,
				errors,
				errorSummary
			});

			return;
		}

		const setSubmittingFor = body?.[submittingFor.id];

		if (!setSubmittingFor) return res.status(404).render('error/not-found');

		const previousSessionValue =
			examinationSession[examinationSessionStorage.property.submittingFor];

		examinationSession[examinationSessionStorage.property.submittingFor] = setSubmittingFor;

		if (req?.query?.mode === 'edit' && previousSessionValue === setSubmittingFor)
			res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
		else if (submittingForOptions[1].value === setSubmittingFor)
			res.redirect(`${examinationDirectory + examinationNameMyselfRoute}`);
		else if (submittingForOptions[2].value === setSubmittingFor)
			res.redirect(`${examinationDirectory + examinationNameOrganisationRoute}`);
		else if (submittingForOptions[3].value === setSubmittingFor)
			res.redirect(`${examinationDirectory + examinationNameAgentRoute}`);
		else res.status(500).render('error/unhandled-exception');
	} catch {
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmittingFor,
	postSubmittingFor
};
