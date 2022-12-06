const config = require('../../../config');
const { isQueryModeEdit } = require('../../utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				email,
				checkYourAnswers: { route: checkYourAnswersRoute }
			}
		}
	}
} = require('../../../routes/config');
const { getBackLink } = require('./utils/get-back-link');

const examinationSessionStorage = config?.sessionStorage?.examination;
const examinationSessionStorageName = examinationSessionStorage?.name;
const examinationSessionStorageEmail = examinationSessionStorage?.property?.email;

const pageData = {
	id: email.id,
	pageTitle: email.name,
	title: email.name,
	hint: "We'll use your email address to confirm we've received your submission. We will not publish your email address."
};

const getEmail = async (req, res) => {
	const requestSession = req.session;
	const examinationStorage = requestSession?.[examinationSessionStorageName];

	if (!examinationStorage) return res.status(404).render('error/not-found');

	const examinationEmail = examinationStorage?.[examinationSessionStorageEmail];
	examinationEmail && (pageData.email = examinationEmail);

	pageData.backLinkUrl = getBackLink(req.session);

	res.render(email.view, pageData);
};

const postEmail = async (req, res) => {
	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;
	const requestSession = req?.session;
	const examinationStorage = requestSession?.[examinationSessionStorageName];

	if (!examinationStorage) return res.status(404).render('error/not-found');

	const examinationEmail = examinationStorage?.property?.email;

	pageData.email = examinationEmail !== 'email' && examinationEmail;

	examinationStorage[examinationSessionStorageEmail] = body[email.id];

	pageData.backLinkUrl = getBackLink(req.session);

	if (errors[email.id] || Object.keys(errors).length > 0) {
		return res.render(email.view, {
			...pageData,
			errors,
			errorSummary
		});
	}

	if (isQueryModeEdit(query)) {
		res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
	} else {
		res.redirect(`${examinationDirectory}/select-deadline-item`);
	}
};

module.exports = {
	getEmail,
	postEmail
};
