const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;
const examinationSessionStorageName = examinationSessionStorage?.name;
const examinationSessionStoragePropertyName = examinationSessionStorage?.property?.name;

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
	const examinationSession = req?.session?.[examinationSessionStorageName];

	const sessionCurrentView = req.session?.currentView;
	const examinationName = examinationSession?.[examinationSessionStoragePropertyName];

	pageData.values.name = examinationName;

	if (!examinationSession || !sessionCurrentView) return res.status(404).render('error/not-found');

	const { id, pageTitle, title, view } = sessionCurrentView;

	if (sessionCurrentView) {
		pageData.values = { ...pageData.values, id, pageTitle, title, view };
	}

	res.render(view, pageData.values);
};

const postName = async (req, res) => {
	const { body = {}, session } = req;
	const { errors = {}, errorSummary = [] } = body;
	const examinationSession = session?.[examinationSessionStorageName];
	const sessionCurrentView = req.session?.currentView;

	if (!examinationSession || !sessionCurrentView?.id)
		return res.status(404).render('error/not-found');

	const { id, view } = sessionCurrentView;
	examinationSession[examinationSessionStoragePropertyName] = req.body[id] ?? '';

	if (errors[id] || Object.keys(errors).length > 0) {
		return res.render(view, {
			...pageData.values,
			errors,
			errorSummary
		});
	}

	const setName = body[id];

	if (!setName) return res.status(404).render('error/not-found');

	examinationSession.name = setName;

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
