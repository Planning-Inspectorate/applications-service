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

	if (path.replace('/', '') === haveYourSay.route) return next();
	else if (!hasExaminationSession(session)) {
		const projectsURL = getProjectsURL(case_ref);
		const url = `${projectsURL}/${baseDirectory}/${haveYourSay.route}`;
		const queryString = Object.keys(query).length ? buildQueryString(query) : '';

		return res.redirect(`${url}${queryString}`);
	}

	next();
};

module.exports = { examinationMiddleware };
