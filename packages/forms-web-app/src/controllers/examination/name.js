const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				checkYourAnswers: { route: checkYourAnswersRoute },
				email: { route: emailRoute },
				nameMyself,
				submittingFor
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	values: { backLinkUrl: `${examinationDirectory + submittingFor.route}` }
};

const getName = async (req, res) => {
	try {
		const examinationSession = req?.session?.[examinationSessionStorage.name];

		if (!examinationSession || !req.currentView) return res.status(404).render('error/not-found');

		const { id, pageTitle, title, view } = req.currentView;

		req.currentView && (pageData.values = { ...pageData.values, id, pageTitle, title, view });

		res.render(view, pageData.values);
	} catch {
		res.status(500).render('error/unhandled-exception');
	}
};

const postName = async (req, res) => {
	try {
		const { body = {}, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const examinationSession = session?.[examinationSessionStorage.name];

		if (!examinationSession) return res.status(404).render('error/not-found');

		if (errors[nameMyself.id] || Object.keys(errors).length > 0) {
			res.render(nameMyself.view, {
				...pageData.values,
				errors,
				errorSummary
			});
			return;
		}

		const setName = body?.[nameMyself.id];

		if (!setName) return res.status(404).render('error/not-found');

		examinationSession[examinationSessionStorage.property.name] = setName;

		if (req.query.mode === 'edit') res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
		else res.redirect(`${examinationDirectory + emailRoute}`);
	} catch {
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getName,
	postName
};
