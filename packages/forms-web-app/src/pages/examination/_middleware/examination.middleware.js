const { buildQueryString } = require('../../_utils/build-query-string');
const { hasExaminationSession } = require('../_session/examination-session');
const {
	routesConfig: {
		examination: {
			baseDirectory,
			pages: { haveYourSay }
		}
	}
} = require('../../../routes/config');
const { getProjectsURL } = require('../../projects/_utils/get-projects-url');

const examinationMiddleware = (req, res, next) => {
	const { params, path, query, session } = req;
	const { case_ref } = params;

	const projectsURL = getProjectsURL(case_ref);
	const indexURL = `${projectsURL}/${baseDirectory}/${haveYourSay.route}`;

	const referrerURL = req.get('Referrer');
	const examinationBaseURL = `/${baseDirectory}/`;
	const withinExaminationJourney = referrerURL ? referrerURL.includes(examinationBaseURL) : false;

	if (path.replace('/', '') === haveYourSay.route) return next();
	else if (withinExaminationJourney && !hasExaminationSession(session)) {
		return res.status(440).render('error/have-your-say-session-expired', { indexURL });
	} else if (!hasExaminationSession(session)) {
		const queryString = Object.keys(query).length ? buildQueryString(query) : '';
		return res.redirect(`${indexURL}${queryString}`);
	}

	next();
};

module.exports = { examinationMiddleware };
