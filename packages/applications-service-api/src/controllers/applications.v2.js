const { getApplication: getApplicationService } = require('../services/application.v2.service');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../error/apiError');
const OSPoint = require('ospoint');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplicationService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = mapResponse(application);

	res.status(StatusCodes.OK).send(applicationResponse);
};

const mapResponse = (application) => ({
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
	Region: application.regions,
	ProjectLocation: application.projectLocation,
	AnticipatedGridRefEasting: application.easting,
	AnticipatedGridRefNorthing: application.northing,
	MapZoomLevel: mapZoomLevel(application.mapZoomLevel),
	AnticipatedDateOfSubmission: application.anticipatedDateOfSubmission,
	AnticipatedSubmissionDateNonSpecific: application.anticipatedSubmissionDateNonSpecific,
	DateOfDCOSubmission: application.dateOfDCOSubmission,
	DateOfDCOAcceptance_NonAcceptance: application.dateOfDCOAcceptance, // TODO: confirm this mapping is correct
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
	dateOfNonAcceptance: application.dateOfNonAcceptance, // TODO: deprecate this attribute
	LongLat: mapLongLat(application.northing, application.easting)
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

const mapLongLat = (northing, easting) => {
	const point = new OSPoint(northing, easting);
	const coordinates = point.toWGS84();
	return [coordinates.longitude, coordinates.latitude];
};

const mapZoomLevel = (zoomLevel) => {
	const ZOOM_LEVELS = [
		'COUNTRY',
		'REGION',
		'COUNTY',
		'BOROUGH',
		'DISTRICT',
		'CITY',
		'TOWN',
		'JUNCTION'
	];
	const ZOOM_LEVEL_OFFSET = 5;
	const DEFAULT_ZOOM_LEVEL = 9;
	return zoomLevel
		? ZOOM_LEVEL_OFFSET + ZOOM_LEVELS.indexOf(zoomLevel.toUpperCase())
		: ZOOM_LEVEL_OFFSET + DEFAULT_ZOOM_LEVEL;
};

module.exports = {
	getApplication
};
