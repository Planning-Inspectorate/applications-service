const { getApplication: getApplicationFromService } = require('../services/application.service');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../error/apiError');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplicationFromService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = mapResponseBackToNILegacyFormat(application);

	res.status(StatusCodes.OK).send(applicationResponse);
};

// map application data from API format back to NI format, for backward compatibility purposes
// TODO remove this mapping and return the new data in new api format directly (breaking change for frontend)
const mapResponseBackToNILegacyFormat = (application) => ({
	CaseReference: application.caseReference,
	ProjectName: application.projectName,
	Proposal: application.projectType,
	Summary: application.projectDescription,
	Stage: stageMap[application.stage],
	PromoterName: 'TBC', // TODO: populate from Service User data
	PromoterFirstName: 'TBC', // TODO: populate from Service User data
	PromoterLastName: 'TBC', // TODO: populate from Service User data
	ApplicantEmailAddress: 'TBC', // TODO: populate from Service User data
	ApplicantPhoneNumber: 'TBC', // TODO: populate from Service User data
	WebAddress: 'TBC', // TODO: populate from Service User data
	ProjectEmailAddress: application.projectEmailAddress,
	Region: application.regions?.map(region => regionMap[region]).join(','),
	ProjectLocation: application.projectLocation,
	AnticipatedGridRefEasting: application.easting,
	AnticipatedGridRefNorthing: application.northing,
	MapZoomLevel: application.mapZoomLevel,
	AnticipatedDateOfSubmission: application.anticipatedDateOfSubmission,
	AnticipatedSubmissionDateNonSpecific: application.anticipatedSubmissionDateNonSpecific,
	DateOfDCOSubmission: application.dateOfDCOSubmission,
	DateOfDCOAcceptance_NonAcceptance: null, // attribute not present in Back Office schema
	DateOfPreliminaryMeeting: application.preliminaryMeetingStartDate,
	ConfirmedStartOfExamination: application.confirmedStartOfExamination,
	DateTimeExaminationEnds: application.dateTimeExaminationEnds,
	DateOfRepresentationPeriodOpen: application.dateOfRepresentationPeriodOpen,
	DateOfRelevantRepresentationClose: application.dateOfRelevantRepresentationClose,
	DateRRepAppearOnWebsite: application.dateRRepAppearOnWebsite,
	Stage4ExtensiontoExamCloseDate: application.stage4ExtensionToExamCloseDate,
	stage5ExtensionToRecommendationDeadline: application.stage5ExtensionToRecommendationDeadline,
	Stage5ExtensiontoDecisionDeadline: application.stage5ExtensionToDecisionDeadline,
	DateOfRecommendations: application.dateOfRecommendations,
	ConfirmedDateOfDecision: application.confirmedDateOfDecision,
	DateProjectWithdrawn: application.dateProjectWithdrawn,
	sourceSystem: application.sourceSystem,
	dateOfNonAcceptance: application.dateOfNonAcceptance,
	LongLat: application.longLat
});

const stageMap = {
	draft: 0,
	pre_application: 1,
	acceptance: 2,
	pre_examination: 3,
	examination: 4,
	recommendation: 5,
	decision: 6,
	post_decision: 7,
	withdrawn: 8
};

const regionMap = {
	east_midlands: 'East Midlands',
	eastern: 'Eastern',
	london: 'London',
	north_east: 'North East',
	north_west: 'North West',
	south_east: 'South East',
	south_west: 'South West',
	wales: 'Wales',
	west_midlands: 'West Midlands',
	yorkshire_and_the_humber: 'Yorkshire and the Humber'
}

module.exports = {
	getApplication
};
