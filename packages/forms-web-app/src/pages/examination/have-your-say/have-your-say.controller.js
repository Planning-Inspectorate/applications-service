const config = require('../../../config');
const examinationSession = config.sessionStorage.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		}
	},
	routesConfig: { project }
} = require('../../../routes/config');

const getHaveYourSay = async (req, res) => {
	const { session = { examination: { caseRef: null, name: null } } } = req;
	const reqExaminationSession = session[examinationSession.name] ?? { caseRef: null };

	const { caseRef } = reqExaminationSession;

	if (!reqExaminationSession || !caseRef) return res.status(404).render('error/not-found');

	const backLinkUrl = `${project.directory}/${caseRef}${project.pages.examinationTimetable.route}`;
	const pageTitle = 'Have your say during the Examination of the application';
	const startNowUrl = `${examinationDirectory}${hasInterestedPartyNumberRoute}`;
	const title = 'Have your say during the Examination of the application';

	res.render('examination/have-your-say/have-your-say.njk', {
		backLinkUrl,
		pageTitle,
		startNowUrl,
		title
	});
};

module.exports = {
	getHaveYourSay
};
