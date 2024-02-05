const { pick, omit } = require('lodash');
const { mapZoomLevel, mapLongLat, mapNorthingEastingToLongLat } = require('./mapLocation');

const NI_MAPPING = {
	sector: [
		{ ni: 'BC', api: 'business_and_commercial', label: 'Business and Commercial' },
		{ ni: 'EN', api: 'energy', label: 'Energy' },
		{ ni: 'TR', api: 'transport', label: 'Transport' },
		{ ni: 'WA', api: 'water', label: 'Water' },
		{ ni: 'WS', api: 'waste', label: 'Waste' },
		{ ni: 'WW', api: 'waste_water', label: 'Waste Water' }
	],
	stage: [
		{ ni: 0, api: 'draft', label: 'Draft' },
		{ ni: 1, api: 'pre_application', label: 'Pre-application' },
		{ ni: 2, api: 'acceptance', label: 'Acceptance' },
		{ ni: 3, api: 'pre_examination', label: 'Pre-examination' },
		{ ni: 4, api: 'examination', label: 'Examination' },
		{ ni: 5, api: 'recommendation', label: 'Recommendation' },
		{ ni: 6, api: 'decision', label: 'Decision' },
		{ ni: 7, api: 'post_decision', label: 'Post-decision' },
		{ ni: 8, api: 'withdrawn', label: 'Withdrawn' }
	],
	region: [
		{ ni: 'East Midlands', api: 'east_midlands', label: 'East Midlands' },
		{ ni: 'Eastern', api: 'eastern', label: 'Eastern' },
		{ ni: 'London', api: 'london', label: 'London' },
		{ ni: 'North East', api: 'north_east', label: 'North East' },
		{ ni: 'North West', api: 'north_west', label: 'North West' },
		{ ni: 'South East', api: 'south_east', label: 'South East' },
		{ ni: 'South West', api: 'south_west', label: 'South West' },
		{ ni: 'Wales', api: 'wales', label: 'Wales' },
		{ ni: 'West Midlands', api: 'west_midlands', label: 'West Midlands' },
		{
			ni: 'Yorkshire and the Humber',
			api: 'yorkshire_and_the_humber',
			label: 'Yorkshire and the Humber'
		}
	]
};

const mapColumnLabelToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((mapping) => mapping.ni === Number(value))?.label;
		default:
			return NI_MAPPING[name].find((mapping) => mapping.ni === value)?.label;
	}
};

const mapColumnValueToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((mapping) => mapping.ni === Number(value))?.api;
		default:
			return NI_MAPPING[name].find((mapping) => mapping.ni === value)?.api;
	}
};

const mapFilterValueToNI = (name, value) =>
	NI_MAPPING[name].find((mapping) => mapping.api === value)?.ni;

const isValidNIColumnValue = (name, value) =>
	NI_MAPPING[name]?.some((mapping) => mapping.ni === value);

/**
 * Build Applications API filters from list of Applications from NI database
 * @param {{ Stage: number, Region: string, Proposal: string }[]} applications
 * @returns {{name: string, value: string, label: string, count: number}[]}
 */
const buildApiFiltersFromNIApplications = (applications) => {
	const mappedFilters = applications.reduce(
		(memo, application) => {
			const stageValue = application.Stage;
			const regionValue = application.Region;
			const sectorValue = application.Proposal?.substring(0, 2);

			if (isValidNIColumnValue('stage', stageValue))
				memo.stage[stageValue] = memo.stage[stageValue] + 1 || 1;
			if (isValidNIColumnValue('sector', sectorValue))
				memo.sector[sectorValue] = memo.sector[sectorValue] + 1 || 1;
			if (Array.isArray(regionValue)) {
				regionValue.forEach((region) => {
					if (isValidNIColumnValue('region', region))
						memo.region[region] = memo.region[region] + 1 || 1;
				});
			} else {
				if (isValidNIColumnValue('region', regionValue))
					memo.region[regionValue] = memo.region[regionValue] + 1 || 1;
			}
			return memo;
		},
		{
			stage: {},
			region: {},
			sector: {}
		}
	);

	const filters = [];
	for (const [field, filterValues] of Object.entries(mappedFilters)) {
		for (const [value, count] of Object.entries(filterValues)) {
			const filter = {
				name: field,
				value: mapColumnValueToApi(field, value),
				label: mapColumnLabelToApi(field, value),
				count: count
			};
			filters.push(filter);
		}
	}

	return filters;
};

/**
 * Builds Applications API filters from list of Applications from Back Office
 * @param applications
 * @returns {{name: string, value: string, label: string, count: number}[]}
 */
const buildApplicationsFiltersFromBOApplications = (applications) => {
	const mappedToNIApplications = applications.map((application) => {
		return {
			Stage: stageMap[application.stage],
			Region: application.regions?.split(',').map((region) => regionMap[region.trim()]),
			Proposal: application.sector
		};
	});
	return buildApiFiltersFromNIApplications(mappedToNIApplications);
};

/**
 * Map API filters back to values for querying against NI database
 * @param {{ stage?: string[], region?: string[], sector?: string[] }} query
 * @returns {{ stage?: string[], region?: string[], sector?: string[] }}
 */
const mapApplicationFiltersToNI = (query) => {
	return ['stage', 'region', 'sector'].reduce((memo, field) => {
		const filterValues = query[field];
		if (filterValues && filterValues.length > 0) {
			memo[field] = filterValues.map((value) => mapFilterValueToNI(field, value));
		}
		return memo;
	}, {});
};

/**
 * Map Application object from NI database to API format
 * @param application
 */
const mapNIApplicationToApi = (application) => {
	if (!application) return;

	const longLat = application.LongLat || mapLongLat(application.LatLong);
	const zoomLevel = Number.isInteger(application.MapZoomLevel)
		? application.MapZoomLevel
		: mapZoomLevel(application.MapZoomLevel);

	return {
		caseReference: application.CaseReference,
		projectName: application.ProjectName,
		projectType: application.Proposal,
		projectDescription: application.Summary,
		projectLocation: application.ProjectLocation,
		projectEmailAddress: application.ProjectEmailAddress,
		applicantName: application.PromoterName,
		applicantFirstName: application.PromoterFirstName,
		applicantLastName: application.PromoterLastName,
		applicantPhoneNumber: application.ApplicantPhoneNumber,
		applicantEmailAddress: application.ApplicantEmailAddress,
		applicantWebsite: application.WebAddress,
		easting: application.AnticipatedGridRefEasting,
		northing: application.AnticipatedGridRefNorthing,
		longLat: longLat,
		mapZoomLevel: zoomLevel,
		regions: [mapColumnValueToApi('region', application.Region)],
		sector: mapColumnValueToApi('sector', application.Proposal?.substring(0, 2)),
		stage: mapColumnValueToApi('stage', application.Stage),
		anticipatedDateOfSubmission: application.AnticipatedDateOfSubmission,
		anticipatedSubmissionDateNonSpecific: application.AnticipatedSubmissionDateNonSpecific,
		confirmedDateOfDecision: application.ConfirmedDateOfDecision,
		confirmedStartOfExamination: application.ConfirmedStartOfExamination,
		dateOfDCOAcceptance: null, // field is in NI but we don't include it in query
		dateOfDCOSubmission: application.DateOfDCOSubmission,
		dateOfNonAcceptance: application.dateOfNonAcceptance,
		dateOfRecommendations: application.DateOfRecommendations,
		dateOfRelevantRepresentationClose: application.DateOfRelevantRepresentationClose,
		dateOfRepresentationPeriodOpen: application.DateOfRepresentationPeriodOpen,
		dateProjectAppearsOnWebsite: null, // TODO is there NI equivalent for this?
		dateProjectWithdrawn: application.DateProjectWithdrawn,
		dateRRepAppearOnWebsite: application.DateRRepAppearOnWebsite,
		dateTimeExaminationEnds: application.DateTimeExaminationEnds,
		deadlineForAcceptanceDecision: null, // TODO is there NI equivalent for this?
		preliminaryMeetingStartDate: application.DateOfPreliminaryMeeting,
		sourceSystem: application.sourceSystem,
		stage4ExtensionToExamCloseDate: application.Stage4ExtensiontoExamCloseDate,
		stage5ExtensionToDecisionDeadline: application.Stage5ExtensiontoDecisionDeadline,
		stage5ExtensionToRecommendationDeadline: application.stage5ExtensionToRecommendationDeadline
	};
};

/**
 * Map Application object from Back Office to API format
 * @param application
 */
const mapBackOfficeApplicationToApi = (application) => {
	if (!application) return;
	const data = pick(application, [
		'caseReference',
		'projectName',
		'projectType',
		'projectDescription',
		'projectLocation',
		'projectEmailAddress',
		'easting',
		'northing',
		'stage',
		'anticipatedDateOfSubmission',
		'anticipatedSubmissionDateNonSpecific',
		'confirmedDateOfDecision',
		'confirmedStartOfExamination',
		'dateOfDCOAcceptance',
		'dateOfDCOSubmission',
		'dateOfNonAcceptance',
		'dateOfRecommendations',
		'dateOfRelevantRepresentationClose',
		'dateOfRepresentationPeriodOpen',
		'dateProjectAppearsOnWebsite',
		'dateProjectWithdrawn',
		'dateRRepAppearOnWebsite',
		'dateTimeExaminationEnds',
		'deadlineForAcceptanceDecision',
		'preliminaryMeetingStartDate',
		'sourceSystem',
		'stage4ExtensionToExamCloseDate',
		'stage5ExtensionToDecisionDeadline',
		'stage5ExtensionToRecommendationDeadline'
	]);

	return {
		...data,
		applicantName: application.applicant?.organisationName || '',
		applicantFirstName: application.applicant?.firstName || '',
		applicantLastName: application.applicant?.lastName || '',
		applicantPhoneNumber: application.applicant?.phoneNumber || '',
		applicantEmailAddress: application.applicant?.email || '',
		applicantWebsite: application.applicant?.webAddress || '',
		sector: mapColumnValueToApi('sector', application.sector?.substring(0, 2)),
		longLat: mapNorthingEastingToLongLat(application.northing, application.easting),
		mapZoomLevel: mapZoomLevel(application.mapZoomLevel),
		regions: application.regions?.split(',') // TODO store in separate table not CSV
	};
};

/**
 * Map Applications array from Back Office to legacy API format
 * @param applications
 */
const mapBackOfficeApplicationsToApi = (applications) => {
	const mappedToApi = applications.map(mapBackOfficeApplicationToApi);
	return mappedToApi.map(mapResponseBackToNILegacyFormat);
};

/**
 * Adds MapZoomLevel and LongLat properties to NI Application
 * @params application
 * @return application
 */
const addMapZoomLevelAndLongLat = (application) => {
	if (!application) return application;
	return {
		...omit(application, ['LatLong', 'MapZoomLevel']),
		LongLat: mapLongLat(application.LatLong),
		MapZoomLevel: mapZoomLevel(application.MapZoomLevel)
	};
};

// map application data from API format back to NI format, for backward compatibility purposes
// TODO remove this mapping and return the new data in new api format directly (breaking change for frontend)
const mapResponseBackToNILegacyFormat = (application) => ({
	CaseReference: application.caseReference,
	ProjectName: application.projectName,
	Proposal: application.projectType,
	Summary: application.projectDescription,
	Stage: stageMap[application.stage],
	PromoterName: application.applicantName,
	PromoterFirstName: application.applicantFirstName,
	PromoterLastName: application.applicantLastName,
	ApplicantEmailAddress: application.applicantEmailAddress,
	ApplicantPhoneNumber: application.applicantPhoneNumber,
	WebAddress: application.applicantWebsite,
	ProjectEmailAddress: application.projectEmailAddress,
	Region: application.regions?.map((region) => regionMap[region]).join(','),
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
};

module.exports = {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI,
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	addMapZoomLevelAndLongLat,
	mapResponseBackToNILegacyFormat,
	buildApplicationsFiltersFromBOApplications
};
