const { getAppData } = require('../../../services/application.service');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const dayjs = require('dayjs');

const badDateToNull = (date) => (date === '0000-00-00' ? null : date);

const add28DaysToDate = (date) => (date ? dayjs(date).add(28, 'days').toISOString() : null);
const getApplicationData = async (case_ref) => {
	const { data, resp_code } = await getAppData(case_ref);
	if (resp_code !== 200) throw new Error('Application response status not 200');

	const status = {
		number: data.Stage,
		text: projectInfoProjectStages[data.Stage]
	};

	const DateOfDCOSubmission = badDateToNull(data.DateOfDCOSubmission);

	return {
		projectName: data.ProjectName,
		caseRef: data.CaseReference,
		proposal: data.Proposal,
		summary: data.Summary,
		confirmedDateOfDecision: badDateToNull(data.ConfirmedDateOfDecision),
		webAddress: data.WebAddress,
		dateOfNonAcceptance: badDateToNull(data.dateOfNonAcceptance),
		status,
		anticipatedDateOfSubmission: badDateToNull(data.AnticipatedDateOfSubmission),
		contactEmailAddress: data.ProjectEmailAddress,
		DateOfDCOSubmission: add28DaysToDate(DateOfDCOSubmission),
		DateOfRepresentationPeriodOpen: badDateToNull(data.DateOfRepresentationPeriodOpen),
		DateOfRelevantRepresentationClose: badDateToNull(data.DateOfRelevantRepresentationClose),
		DateRRepAppearOnWebsite: badDateToNull(data.DateRRepAppearOnWebsite),
		DateOfPreliminaryMeeting: badDateToNull(data.DateOfPreliminaryMeeting)
	};
};

module.exports = {
	getApplicationData
};
