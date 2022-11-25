const config = require('../../config');
const { isQueryModeEdit } = require('../utils/is-query-mode-edit');
const examinationSessionStorage = config?.sessionStorage?.examination;
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				isApplicant,
				checkYourAnswers: { route: checkYourAnswersRoute },
				email: { route: emailRoute },
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory + hasInterestedPartyNumberRoute}`,
	id: isApplicant.id,
	options: [isApplicant.options[1], isApplicant.options[2]]
};

const getProjectName = (req) => {
	const { session } = req;

	return session?.appData?.ProjectName || 'the applicant?';
};

const addProjectName = (copy, projectName) => {
	return copy.replace('#', projectName);
};

const getTitle = (req) => {
	const projectName = getProjectName(req);

	return addProjectName(isApplicant.title, projectName);
};

const setTitle = (data, title) => {
	data.pageTitle = title;
	data.title = title;
};

const {
	options: { 1: yesOption, 2: noOption }
} = isApplicant;

const getIsApplicant = (req, res) => {
	const { session } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const title = getTitle(req, res);

	const setPageData = { ...pageData };

	setTitle(setPageData, title);

	const examinationSessionApplicant =
		session?.[examinationSessionStorage.name]?.[examinationSessionStorage.property.applicant];

	if (examinationSessionApplicant) {
		const applicantValues = { ...isApplicant.options };

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

	res.render(isApplicant.view, setPageData);
};

const postIsApplicant = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[isApplicant.id] || Object.keys(errors).length > 0) {
		const title = getTitle(req, res);

		const setPageData = { ...pageData };

		setTitle(setPageData, title);

		const updatedErrorMessage = addProjectName(errors[isApplicant.id].msg, getProjectName(req));

		if (errors?.[isApplicant.id]?.msg) errors[isApplicant.id].msg = updatedErrorMessage;

		const updatedErrorSummary = errorSummary.map((errorSummaryItem) => {
			if (errorSummaryItem.href === `#${isApplicant.id}`) {
				errorSummaryItem.text = updatedErrorMessage;
			}

			return errorSummaryItem;
		});

		res.render(isApplicant.view, {
			...setPageData,
			errors,
			errorSummary: updatedErrorSummary
		});

		return;
	}

	const applicantValue = body?.[isApplicant.id];

	if (!applicantValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.applicant] = applicantValue;

	if (isQueryModeEdit(query)) res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
	else if (yesOption.value === applicantValue) res.redirect(`${examinationDirectory}${emailRoute}`);
	else if (noOption.value === applicantValue)
		res.redirect(`${examinationDirectory}${submittingForRoute}`);
	else res.status(500).render('error/unhandled-exception');
};

module.exports = {
	getIsApplicant,
	postIsApplicant
};
