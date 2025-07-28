const { stringify } = require('csv-stringify/sync');
const moment = require('moment');
const { stageNameFromValue } = require('./application.mapper');

const formatIfDate = (potentialDate) =>
	moment(potentialDate).isValid() ? moment(potentialDate).format('YYYY-MM-DD') : potentialDate;

const formatStageForCSV = (application) => {
	const { isMaterialChange } = application;

	const stageNames = {
		draft: 'Draft',
		pre_application: 'Pre-application',
		acceptance: isMaterialChange ? 'Application received' : 'Acceptance',
		pre_examination: isMaterialChange ? 'Application published' : 'Pre-examination',
		examination: 'Examination',
		recommendation: 'Recommendation',
		decision: 'Decision',
		post_decision: 'Post-decision',
		withdrawn: 'Withdrawn'
	};

	const name = stageNames[stageNameFromValue(application.Stage)];
	if (!name) {
		throw new Error(`Invalid stage value: ${application.Stage}`);
	}

	return name;
};

const mapApplicationsToCSV = (applications) => {
	const mappedApplications = applications.map((application) => ({
		'Project reference': application.CaseReference,
		'Project name': application.ProjectName,
		'Applicant name': application.PromoterName,
		'Application type': application.Proposal,
		Region: application.Region,
		Location: application.ProjectLocation,
		'Grid reference - Easting': application.AnticipatedGridRefEasting,
		'Grid reference - Northing:': application.AnticipatedGridRefNorthing,
		'GPS co-ordinates': application.LongLat?.join(', ') || '',
		Stage: formatStageForCSV(application),
		Description: application.Summary,
		'Anticipated submission period': application.AnticipatedSubmissionDateNonSpecific,
		'Date of application': application.DateOfDCOSubmission,
		'Date application accepted': application.DateOfDCOAcceptance_NonAcceptance,
		'Date Examination started': application.ConfirmedStartOfExamination,
		'Date Examination closed': application.DateTimeExaminationEnds,
		'Date of recommendation': application.DateOfRecommendations,
		'Date of decision': application.ConfirmedDateOfDecision,
		'Date withdrawn': application.DateProjectWithdrawn
	}));

	return stringify(mappedApplications, {
		header: true,
		escape_formulas: true,
		quoted_string: true,
		cast: {
			date: (value) => formatIfDate(value)
		}
	});
};

module.exports = mapApplicationsToCSV;
