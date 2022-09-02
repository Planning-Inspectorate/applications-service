const config = require('../../config');
const examinationSession = config.sessionStorage.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				haveYourSay: { view: examinationHaveYourSayView },
				tbc: { route: examinationTbcRoute }
			}
		}
	},
	routesConfig: { project }
} = require('../../routes/config');

const getHaveYourSay = async (req, res) => {
	const reqExaminationSession = req.session[examinationSession.name];

	if (!reqExaminationSession) return res.status(404).render('error/not-found');

	const { caseRef } = reqExaminationSession;

	if (!caseRef) return res.status(404).render('error/not-found');

	const backLinkUrl = `${project.directory}/${caseRef}${project.pages.examinationTimetable.route}`;
	const pageTitle = 'Have your say during the Examination of the application';
	const startNowUrl = `${examinationDirectory}${examinationTbcRoute}`;
	const title = 'Have your say during the Examination of the application';

	res.render(examinationHaveYourSayView, {
		backLinkUrl,
		pageTitle,
		startNowUrl,
		title
	});
};

module.exports = {
	getHaveYourSay
};
