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
} = require('../../routes/config');

const config = require('../../config');
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
	const currentView = requestSession?.currentView;

	if (!examinationStorage || !currentView || !currentView?.route)
		return res.status(404).render('error/not-found');

	const examinationEmail = examinationStorage?.[examinationSessionStorageEmail];
	examinationEmail && (pageData.email = examinationEmail);

	pageData.backLinkUrl = `${examinationDirectory + currentView.route}`;
	res.render(email.view, pageData);
};

const postEmail = async (req, res) => {
	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;
	const requestSession = req?.session;
	const currentView = requestSession?.currentView;
	const examinationStorage = requestSession?.[examinationSessionStorageName];

	if (!currentView || !examinationStorage) return res.status(404).render('error/not-found');

	const examinationEmail = examinationStorage?.property?.email;

	pageData.email = examinationEmail !== 'email' && examinationEmail;

	examinationStorage[examinationSessionStorageEmail] = body[email.id];

	pageData.backLinkUrl = `${examinationDirectory + currentView.route}`;

	if (errors[email.id] || Object.keys(errors).length > 0) {
		return res.render(email.view, {
			...pageData,
			errors,
			errorSummary
		});
	}

	if (req.query?.mode === 'edit') {
		res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
	} else {
		res.redirect(`${examinationDirectory}/select-deadline-item`);
	}
};

module.exports = {
	getEmail,
	postEmail
};
