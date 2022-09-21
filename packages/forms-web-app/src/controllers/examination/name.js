const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				checkYourAnswers: { route: checkYourAnswersRoute },
				email: { route: emailRoute },
				submittingFor
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	values: { backLinkUrl: `${examinationDirectory + submittingFor.route}` }
};

const getName = async (req, res) => {
	const examinationSession = req?.session?.[examinationSessionStorage.name];

	const sessionCurrentView = req.session?.currentView;
	const sessionName = examinationSessionStorage.property.name;

	if (sessionName && sessionName !== 'name') {
		pageData.values.name = sessionName;
	}

	if (!examinationSession || !sessionCurrentView) return res.status(404).render('error/not-found');

	const { id, pageTitle, title, view } = sessionCurrentView;

	sessionCurrentView && (pageData.values = { ...pageData.values, id, pageTitle, title, view });

	res.render(view, pageData.values);
};

const postName = async (req, res) => {
	const { body = {}, session } = req;
	const { errors = {}, errorSummary = [] } = body;
	const examinationSession = session?.[examinationSessionStorage.name];
	const sessionCurrentView = req.session?.currentView;

	if (!examinationSession || !sessionCurrentView?.id)
		return res.status(404).render('error/not-found');

	const { id, view } = sessionCurrentView;
	examinationSessionStorage.property.name = req.body[id] ?? '';

	if (errors[id] || Object.keys(errors).length > 0) {
		return res.render(view, {
			...pageData.values,
			errors,
			errorSummary
		});
	}

	const setName = body[id];

	if (!setName) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.name] = setName;

	if (req.query?.mode === 'edit') {
		res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
	} else {
		res.redirect(`${examinationDirectory + emailRoute}`);
	}
};

module.exports = {
	getName,
	postName
};
