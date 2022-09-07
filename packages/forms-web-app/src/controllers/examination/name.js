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
	backLinkUrl: `${examinationDirectory + submittingFor.route}`,
	id: nameMyself.id,
	pageTitle: nameMyself.name,
	title: nameMyself.name
};

const getName = async (req, res) => {
	try {
		const setPageData = { ...pageData };

		const examinationSession = req?.session?.[examinationSessionStorage.name];

		if (!examinationSession) return res.status(404).render('error/not-found');

		const examinationSessionName = examinationSession[examinationSessionStorage.property.name];

		if (examinationSessionName) setPageData.name = examinationSessionName;

		res.render(nameMyself.view, setPageData);
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
				...pageData,
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
