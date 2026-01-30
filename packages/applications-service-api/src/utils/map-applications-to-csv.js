const { stringify } = require('csv-stringify/sync');
const moment = require('moment');
const { stageNameFromValue } = require('./application.mapper');
const getUrlForBlobStoreDocs = require('./get-url-for-blob-store-docs');

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

const shouldShowAnticipatedCloseDate = (application) => {
	const stage = stageNameFromValue(application.Stage);

	const validStages = ['examination', 'recommendation', 'decision', 'post_decision', 'withdrawn'];

	return validStages.includes(stage) && application.AnticipatedCloseOfExamination;
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
		"Examining Authority's anticipated close of examination": shouldShowAnticipatedCloseDate(
			application
		)
			? application.AnticipatedCloseOfExamination
			: '',
		'Date Examination closed': application.DateTimeExaminationEnds,
		'Date of recommendation': application.DateOfRecommendations,
		'Date of decision': application.ConfirmedDateOfDecision,
		'Date withdrawn': application.DateProjectWithdrawn
	}));

	// insert blank rows
	mappedApplications.push({}, {});
	// get URL

	// append link for quality data guide
	mappedApplications.push({
		'Project reference':
			'To view the quality guide for this data paste this url into your browser:',
		'Grid reference - Northing:': getUrlForQualityDataGuide()
	});

	return stringify(mappedApplications, {
		header: true,
		escape_formulas: true,
		quoted_string: true,
		cast: {
			date: (value) => formatIfDate(value)
		}
	});
};

// Constructs the full URL to the published Quality Data Guide document.
function getUrlForQualityDataGuide() {
	try {
		const baseUrl = getUrlForBlobStoreDocs();
		const qualityGuideFilename = 'NSIP projects data quality guide.xlsx';
		const encodedFilename = encodeURIComponent(qualityGuideFilename);
		return `${baseUrl}published-documents/${encodedFilename}`;
	} catch (error) {
		return `Error constructing URL for Quality Data Guide: ${error.message}`;
	}
}

module.exports = {
	mapApplicationsToCSV,
	getUrlForQualityDataGuide
};
