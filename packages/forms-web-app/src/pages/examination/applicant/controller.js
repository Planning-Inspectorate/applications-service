const config = require('../../../config');
const { isQueryModeEdit } = require('../../../controllers/utils/is-query-mode-edit');
const examinationSessionStorage = config?.sessionStorage?.examination;
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				applicant,
				checkYourAnswers: { route: checkYourAnswersRoute },
				email: { route: emailRoute },
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	}
} = require('../../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory + hasInterestedPartyNumberRoute}`,
	id: applicant.id,
	options: [applicant.options[1], applicant.options[2]]
};

const getProjectName = (req) => {
	const { session } = req;

	return session?.promoterName || 'the applicant?';
};

const addProjectName = (copy, projectName) => {
	return copy.replace('#', projectName);
};

const getTitle = (req) => {
	const projectName = getProjectName(req);

	return addProjectName(applicant.title, projectName);
};

const setTitle = (data, title) => {
	data.pageTitle = title;
	data.title = title;
};

const {
	options: { 1: yesOption, 2: noOption }
} = applicant;

const view = 'examination/applicant/view.njk';
const getApplicant = (req, res) => {
	const { session } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const title = getTitle(req, res);

	const setPageData = { ...pageData };

	setTitle(setPageData, title);

	const examinationSessionApplicant =
		session?.[examinationSessionStorage.name]?.[examinationSessionStorage.property.applicant];

	if (examinationSessionApplicant) {
		const applicantValues = { ...applicant.options };

		const updatedApplicantValues = Object.keys(applicantValues).map((value) => {
			const valueChecked = applicantValues[value].value === examinationSessionApplicant;

			if (!valueChecked) return applicantValues[value];

			return {
				...applicantValues[value],
				checked: 'checked'
			};
		});

		setPageData.options = updatedApplicantValues;
	}

	res.render(view, setPageData);
};

const postApplicant = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[applicant.id] || Object.keys(errors).length > 0) {
		const title = getTitle(req, res);

		const setPageData = { ...pageData };

		setTitle(setPageData, title);

		const updatedErrorMessage = addProjectName(errors[applicant.id].msg, getProjectName(req));

		if (errors?.[applicant.id]?.msg) errors[applicant.id].msg = updatedErrorMessage;

		const updatedErrorSummary = errorSummary.map((errorSummaryItem) => {
			if (errorSummaryItem.href === `#${applicant.id}`) {
				errorSummaryItem.text = updatedErrorMessage;
			}

			return errorSummaryItem;
		});

		res.render(view, {
			...setPageData,
			errors,
			errorSummary: updatedErrorSummary
		});

		return;
	}

	const applicantValue = body?.[applicant.id];

	if (!applicantValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.applicant] = applicantValue;

	if (isQueryModeEdit(query)) res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
	else if (yesOption.value === applicantValue) res.redirect(`${examinationDirectory}${emailRoute}`);
	else if (noOption.value === applicantValue)
		res.redirect(`${examinationDirectory}${submittingForRoute}`);
	else res.status(500).render('error/unhandled-exception');
};

module.exports = {
	getApplicant,
	postApplicant
};
