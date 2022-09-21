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
	title: email.name
};

const getEmail = async (req, res) => {
	const requestSession = req.session;
	const userEmail = requestSession?.userEmail;
	const currentView = requestSession?.currentView;
	userEmail && (pageData.email = userEmail);

	console.log({ requestSession });

	if (!requestSession || !currentView) return res.status(404).render('error/not-found');

	pageData.backLinkUrl = `${examinationDirectory + currentView.route}`;
	res.render(email.view, pageData);
};

const postEmail = async (req, res) => {
	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;
	const requestSession = req.session;
	const currentView = requestSession?.currentView;
	requestSession?.userEmail && (pageData.email = requestSession?.userEmail);

	if (errors[email.id] || Object.keys(errors).length > 0) {
		return res.render(email.view, {
			...pageData,
			errors,
			errorSummary
		});
	}

	if (!requestSession || !currentView) return res.status(404).render('error/not-found');

	requestSession.userEmail = examinationSessionStorage.property.email = body[email.id];
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
