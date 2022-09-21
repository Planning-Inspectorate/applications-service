const config = require('../../config');
const examinationSessionStorage = config.sessionStorage.examination;

const {
	routesConfig: {
		examination: {
			pages: {
				yourInterestedPartyNumber,
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	},
	routesConfig: { examination }
} = require('../../routes/config');

const backLinkUrl = `${examination.directory + hasInterestedPartyNumberRoute}`;
const pageTitle = yourInterestedPartyNumber.name;
const title = yourInterestedPartyNumber.name;

const unhandledException = (res) => res.status(500).render('error/unhandled-exception');

const getYourInterestedPartyNumber = (req, res) => {
	try {
		const { session = { examination: { name: null } } } = req;
		const reqExaminationSession = session[examinationSessionStorage?.name] ?? '';

		if (!reqExaminationSession) return res.status(404).render('error/not-found');

		const { interestedPartyNumber = '' } = reqExaminationSession;

		res.render(yourInterestedPartyNumber.view, {
			id: yourInterestedPartyNumber.id,
			backLinkUrl,
			interestedPartyNumber,
			pageTitle,
			title
		});
	} catch {
		unhandledException(res);
	}
};

const postYourInterestedPartyNumber = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[yourInterestedPartyNumber.id] || Object.keys(errors).length > 0) {
		res.render(yourInterestedPartyNumber.view, {
			id: yourInterestedPartyNumber.id,
			backLinkUrl,
			errors,
			errorSummary,
			pageTitle,
			title
		});
		return;
	}

	const yourInterestedPartyNumberValue = body?.[yourInterestedPartyNumber.id];

	if (!yourInterestedPartyNumberValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.interestedPartyNumber] =
		yourInterestedPartyNumberValue;
	examinationSession[examinationSessionStorage.property.applicant] = '';

	if (req.query.mode === 'edit') {
		res.redirect(`${examination.directory + yourInterestedPartyNumber.route}`);
	} else {
		res.redirect(`${examination.directory + submittingForRoute}`);
	}
};

module.exports = {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
};
