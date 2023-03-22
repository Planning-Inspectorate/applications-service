const {
	routesConfig: { project }
} = require('../../../../routes/config');
const getBackLink = (caseRef, url) =>
	url && url.includes(project.directory)
		? `${project.directory}/${caseRef}${project.pages.examinationTimetable.route}`
		: '';

module.exports = {
	getBackLink
};
