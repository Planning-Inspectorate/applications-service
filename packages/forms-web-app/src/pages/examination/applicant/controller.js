const config = require('../../../config');
const { isQueryModeEdit } = require('../../../controllers/utils/is-query-mode-edit');
const examinationSessionStorage = config?.sessionStorage?.examination;
const { getPageData } = require('./_utils/get-page-data');
const { applicantOptionValues } = require('./config');
const {
	routesConfig: {
		examination: {
			pages: {
				applicant,
				checkYourAnswers: { route: checkYourAnswersRoute },
				email: { route: emailRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	}
} = require('../../../routes/config');

const view = 'examination/applicant/view.njk';

const getApplicant = (req, res) => {
	const { i18n, session } = req;

	return res.render(view, getPageData(i18n, session));
};

const postApplicant = (req, res) => {
	const { i18n, session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[applicant.id] || Object.keys(errors).length > 0) {
		return res.render(view, {
			...getPageData(i18n, session),
			errors,
			errorSummary
		});
	}

	const applicantValue = body?.[applicant.id];

	if (!applicantValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.applicant] = applicantValue;

	if (isQueryModeEdit(query)) return res.redirect(`${checkYourAnswersRoute}`);
	else if (applicantOptionValues[1] === applicantValue) return res.redirect(`${emailRoute}`);
	else if (applicantOptionValues[2] === applicantValue)
		return res.redirect(`${submittingForRoute}`);
	else return res.status(500).render('error/unhandled-exception');
};

module.exports = {
	getApplicant,
	postApplicant
};
