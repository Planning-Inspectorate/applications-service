const {
	routesConfig: {
		examination: {
			pages: {
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		},
		project
	}
} = require('../../../../routes/config');
const getPageData = (case_ref) => ({
	backLinkUrl: `${project.directory}/${case_ref}${project.pages.examinationTimetable.route}`,
	startNowUrl: `${hasInterestedPartyNumberRoute}`
});

module.exports = {
	getPageData
};
