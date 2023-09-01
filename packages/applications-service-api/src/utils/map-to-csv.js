const { stringify } = require('csv-stringify/sync');

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
		'GPS co-ordinates': application.LongLat.join(', '),
		Stage: application.Stage,
		Description: application.Summary,
		'Anticipated submission date': application.AnticipatedDateOfSubmission,
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
		quoted_string: true
	});
};

module.exports = {
	mapApplicationsToCSV
};
