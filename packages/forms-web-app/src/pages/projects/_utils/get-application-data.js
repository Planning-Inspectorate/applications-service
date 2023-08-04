const { getAppData } = require('../../../services/application.service');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const dayjs = require('dayjs');
const getApplicationData = async (case_ref) => {
	const { data, resp_code } = await getAppData(case_ref);
	if (resp_code !== 200) throw new Error('Application response status not 200');

	const status = {
		number: data.Stage,
		text: projectInfoProjectStages[data.Stage]
	};

	const DateOfDCOSubmission = data.DateOfDCOSubmission
		? dayjs(data.DateOfDCOSubmission).add(28, 'days').toISOString()
		: null;

	return {
		projectName: data.ProjectName,
		proposal: data.Proposal,
		summary: data.Summary,
		webAddress: data.WebAddress,
		dateOfNonAcceptance: data.dateOfNonAcceptance,
		status,
		anticipatedDateOfSubmission: data.AnticipatedDateOfSubmission,
		contactEmailAddress: data.ProjectEmailAddress,
		DateOfDCOSubmission
	};
};

module.exports = {
	getApplicationData
};
