const { pick, omit } = require('lodash');
const { mapZoomLevel, mapLongLat, mapNorthingEastingToLongLat } = require('./mapLocation');
const { featureFlag } = require('../lib/config');

const NI_MAPPING = {
	sector: [
		{
			ni: 'BC',
			api: 'business_and_commercial',
			label: 'Business and Commercial',
			label_cy: 'Busnes a Masnachol'
		},
		{ ni: 'EN', api: 'energy', label: 'Energy', label_cy: 'Ynni' },
		{ ni: 'TR', api: 'transport', label: 'Transport', label_cy: 'Trafnidiaeth' },
		{ ni: 'WA', api: 'water', label: 'Water', label_cy: 'Dŵr' },
		{ ni: 'WS', api: 'waste', label: 'Waste', label_cy: 'Gwastraff' },
		{ ni: 'WW', api: 'waste_water', label: 'Waste Water', label_cy: 'Dŵr Gwastraff' }
	],
	stage: [
		{ ni: 0, api: 'draft', label: 'Draft', label_cy: 'Drafft' },
		{ ni: 1, api: 'pre_application', label: 'Pre-application', label_cy: 'Cyn-ymgeisio' },
		{ ni: 2, api: 'acceptance', label: 'Acceptance', label_cy: 'Derbyn' },
		{ ni: 3, api: 'pre_examination', label: 'Pre-examination', label_cy: 'Cyn-archwiliad' },
		{ ni: 4, api: 'examination', label: 'Examination', label_cy: 'Archwiliad' },
		{ ni: 5, api: 'recommendation', label: 'Recommendation', label_cy: 'Argymhelliad' },
		{ ni: 6, api: 'decision', label: 'Decision', label_cy: 'Penderfyniad' },
		{ ni: 7, api: 'post_decision', label: 'Post-decision', label_cy: 'Ôl-benderfyniad' },
		{ ni: 8, api: 'withdrawn', label: 'Withdrawn', label_cy: "Tynnu'n ôl" }
	],
	region: [
		{
			ni: 'East Midlands',
			api: 'east_midlands',
			label: 'East Midlands',
			label_cy: 'Dwyrain Canolbarth Lloegr'
		},
		{ ni: 'Eastern', api: 'eastern', label: 'Eastern', label_cy: 'Dwyreiniol' },
		{ ni: 'London', api: 'london', label: 'London', label_cy: 'Llundain' },
		{ ni: 'North East', api: 'north_east', label: 'North East', label_cy: 'Y Gogledd-ddwyrain' },
		{ ni: 'North West', api: 'north_west', label: 'North West', label_cy: 'Y Gogledd-orllewin' },
		{ ni: 'South East', api: 'south_east', label: 'South East', label_cy: 'Y De-ddwyrain' },
		{ ni: 'South West', api: 'south_west', label: 'South West', label_cy: 'Y De-orllewin' },
		{ ni: 'Wales', api: 'wales', label: 'Wales', label_cy: 'Cymru' },
		{
			ni: 'West Midlands',
			api: 'west_midlands',
			label: 'West Midlands',
			label_cy: 'Gorllewin Canolbarth Lloegr'
		},
		{
			ni: 'Yorkshire and the Humber',
			api: 'yorkshire_and_the_humber',
			label: 'Yorkshire and the Humber',
			label_cy: 'Swydd Efrog a’r Humber'
		}
	]
};

const mapColumnLabelToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((mapping) => mapping.ni === Number(value));
		default:
			return NI_MAPPING[name].find((mapping) => mapping.ni === value);
	}
};
const mapColumnLabelToApiEn = (name, value) => mapColumnLabelToApi(name, value)?.label;
const mapColumnLabelToApiCy = (name, value) => mapColumnLabelToApi(name, value)?.label_cy;

const mapColumnValueToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((mapping) => mapping.ni === Number(value))?.api;
		default:
			return NI_MAPPING[name].find((mapping) => mapping.ni === value)?.api;
	}
};

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
			filters.push({
				name: field,
				value: mapColumnValueToApi(field, value),
				label: mapColumnLabelToApiEn(field, value),
				count: count,
				...(featureFlag.allowWelshTranslation
					? { label_cy: mapColumnLabelToApiCy(field, value) }
					: {})
			});
		}
	}

	return filters;
};

/**
 * Builds Applications API filters from list of Applications from Back Office
 * @param applications
 * @returns {{name: string, value: string, label: string, count: number}[]}
 */
const buildApplicationsFiltersFromApplications = (applications) => {
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
 * Map Application object from Back Office to API format
 * @param application
 */
const mapApplicationToApi = (application) => {
	if (!application) return;

	let fields = [
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
		'dateOfReOpenRelevantRepresentationStart',
		'dateOfReOpenRelevantRepresentationClose',
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
	];

	if (featureFlag.allowWelshTranslation) {
		fields = fields.concat(['projectNameWelsh', 'projectDescriptionWelsh', 'projectLocationWelsh']);
	}

	const data = pick(application, fields);

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
const mapApplicationsToApi = (applications) => {
	const mappedToApi = applications.map(mapApplicationToApi);
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
const mapResponseBackToNILegacyFormat = (application) => {
	const legacyStruct = {
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
		DateOfDCOSubmission: getValidDateInStringOrNull(application.dateOfDCOSubmission),
		DateOfDCOAcceptance_NonAcceptance: null, // attribute not present in Back Office schema
		DateOfPreliminaryMeeting: application.preliminaryMeetingStartDate,
		ConfirmedStartOfExamination: application.confirmedStartOfExamination,
		DateTimeExaminationEnds: application.dateTimeExaminationEnds,
		DateOfRepresentationPeriodOpen: application.dateOfRepresentationPeriodOpen,
		DateOfRelevantRepresentationClose: application.dateOfRelevantRepresentationClose,
		DateOfReOpenRelevantRepresentationStart: application.dateOfReOpenRelevantRepresentationStart,
		DateOfReOpenRelevantRepresentationClose: application.dateOfReOpenRelevantRepresentationClose,
		DateRRepAppearOnWebsite: application.dateRRepAppearOnWebsite,
		Stage4ExtensiontoExamCloseDate: application.stage4ExtensionToExamCloseDate,
		stage5ExtensionToRecommendationDeadline: application.stage5ExtensionToRecommendationDeadline,
		Stage5ExtensiontoDecisionDeadline: application.stage5ExtensionToDecisionDeadline,
		DateOfRecommendations: application.dateOfRecommendations,
		ConfirmedDateOfDecision: getValidDateInStringOrNull(application.confirmedDateOfDecision),
		DateProjectWithdrawn: application.dateProjectWithdrawn,
		sourceSystem: application.sourceSystem,
		dateOfNonAcceptance: application.dateOfNonAcceptance,
		LongLat: application.longLat
	};

	if (featureFlag.allowWelshTranslation) {
		legacyStruct.ProjectNameWelsh = application.projectNameWelsh;
		legacyStruct.SummaryWelsh = application.projectDescriptionWelsh;
		legacyStruct.ProjectLocationWelsh = application.projectLocationWelsh;
	}

	return legacyStruct;
};

const getValidDateInStringOrNull = (date) => {
	if (new Date(date).toString() === 'Invalid Date') return null;
	// NI saves dates as '0000-00-00' when they are not set
	if (date === '0000-00-00') return null;
	return date;
};
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
	buildApplicationsFiltersFromApplications,
	mapApplicationToApi,
	mapApplicationsToApi,
	mapResponseBackToNILegacyFormat,
	addMapZoomLevelAndLongLat
};
