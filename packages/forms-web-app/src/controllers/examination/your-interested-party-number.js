const {
	routesConfig: {
		examination: {
			pages: {
				yourInterestedPartyNumber: {
					id: yourInterestedPartyNumberId,
					name: yourInterestedPartyNumberName,
					route: yourInterestedPartyNumberRoute,
					view: yourInterestedPartyNumberView
				},
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	},
	routesConfig: { examination }
} = require('../../routes/config');

const config = require('../../config');

const examinationSession = config.sessionStorage.examination;
const backLinkUrl = `${examination.directory + hasInterestedPartyNumberRoute}`;
const pageTitle = yourInterestedPartyNumberName;
const title = yourInterestedPartyNumberName;

const unhandledException = (res) => res.status(500).render('error/unhandled-exception');

const getYourInterestedPartyNumber = (req, res) => {
	try {
		const { session = { examination: { name: null } } } = req;
		const reqExaminationSession = session[examinationSession?.name] ?? '';

		if (!reqExaminationSession) return res.status(404).render('error/not-found');

		const { interestedPartyNumber = '' } = reqExaminationSession;

		res.render(yourInterestedPartyNumberView, {
			id: yourInterestedPartyNumberId,
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
	try {
		const { body = { yourInterestedPartyNumberId: '' } } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[yourInterestedPartyNumberId] || Object.keys(errors).length > 0) {
			res.render(yourInterestedPartyNumberView, {
				id: yourInterestedPartyNumberId,
				backLinkUrl,
				errors,
				errorSummary,
				pageTitle,
				title
			});
			return;
		}

		req.session[examinationSession.name][examinationSession.property.interestedPartyNumber] =
			body[yourInterestedPartyNumberId];

		if (req.query.mode === 'edit') {
			res.redirect(`${examination.directory + yourInterestedPartyNumberRoute}`);
		} else {
			res.redirect(`${examination.directory + submittingForRoute}`);
		}
	} catch {
		unhandledException(res);
	}
};

module.exports = {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
};
