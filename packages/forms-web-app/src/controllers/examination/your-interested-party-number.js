const {
	routesConfig: {
		examination: {
			pages: {
				yourInterestedPartyNumber: {
					view: yourInterestedPartyNumberView,
					route: yourInterestedPartyNumberRoute,
					id: yourInterestedPartyNumberId
				},
				haveAnInterestedPartyNumber: { route: haveAnInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	},
	routesConfig: { examination }
} = require('../../routes/config');

const config = require('../../config');

const examinationSession = config.sessionStorage.examination;
const backLinkUrl = `${examination.directory + haveAnInterestedPartyNumberRoute}`;
const pageTitle = "What's your interested party number?";
const title = pageTitle;

const getYourInterestedPartyNumber = (req, res) => {
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
};

const postYourInterestedPartyNumber = (req, res) => {
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
		console.error('shouldEndHere');
		res.redirect(`${examination.directory + submittingForRoute}`);
	}
};

module.exports = {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
};
