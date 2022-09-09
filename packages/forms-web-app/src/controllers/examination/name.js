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

	if (!examinationSession || !req.currentView) return res.status(404).render('error/not-found');

	const { id, pageTitle, title, view } = req.currentView;

	req.currentView && (pageData.values = { ...pageData.values, id, pageTitle, title, view });

	res.render(view, pageData.values);
};

const postName = async (req, res) => {
	const { body = {}, session } = req;
	const { errors = {}, errorSummary = [] } = body;
	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession || !req.currentView?.id) return res.status(404).render('error/not-found');

	const { id, view } = req.currentView;

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
