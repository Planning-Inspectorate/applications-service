const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { email }
		}
	}
} = require('../../routes/config');

const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const pageData = {
	id: email.id,
	pageTitle: email.name,
	title: email.name,
	hint: "We'll use your email address to confirm we've received your submission. We will not publish your email address."
};

const getEmail = async (req, res) => {
	const requestSession = req.session;
	const userEmail = requestSession?.[examinationSessionStorage.name]?.userEmail;
	const currentView = requestSession?.currentView;
	userEmail && (pageData.email = userEmail);

	if (!requestSession || !currentView || !currentView?.route)
		return res.status(404).render('error/not-found');

	pageData.backLinkUrl = `${examinationDirectory + currentView.route}`;
	res.render(email.view, pageData);
};

const postEmail = async (req, res) => {
	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;
	const requestSession = req?.session;
	const currentView = requestSession?.currentView;
	const examinationStorage = requestSession?.[examinationSessionStorage.name];

	examinationStorage?.userEmail && (pageData.email = examinationStorage?.userEmail);

	if (errors[email.id] || Object.keys(errors).length > 0) {
		return res.render(email.view, {
			...pageData,
			errors,
			errorSummary
		});
	}

	if (!requestSession || !currentView) return res.status(404).render('error/not-found');

	examinationStorage.userEmail = examinationSessionStorage.property.email = body[email.id];
	pageData.backLinkUrl = `${examinationDirectory + currentView.route}`;

	if (req.query?.mode === 'edit') {
		res.render(email.view, pageData);
	} else {
		res.redirect(`${examinationDirectory}/select-deadline-item`);
	}
};

module.exports = {
	getEmail,
	postEmail
};
