const { omit } = require('lodash');

// application data as stored in Applications database
const APPLICATION_DB = {
	id: 13,
	caseId: 82,
	caseReference: 'EN010116',
	projectName: 'North Lincolnshire Green Energy Park',
	projectDescription:
		'The Project consists of an Energy Recovery Facility (ERF) converting up to 650,000 tonnes per annum of Refuse Derived Fuel (RDF) to generate a maximum of 95 Mega Watts of electrical output (MWe) and/or 380 Mega Watts of thermal output (MWt) to provide power, heat and steam on the site of the operating Flixborough Wharf on the River Trent. The Project will incorporate battery storage, hydrogen production from the electrolysis of water, hydrogen storage, heat and steam storage. It will also include heat-treatment of bottom and fly ash, concrete block manufacturing, carbon dioxide capture and utilisation and an extended district heat network of 5km, power and gas network to service the nearby proposed housing development. Development at the site will also include the following associated measures to allow access to and from the site by road, rail or river, with a correspondingly reduced environmental impact: i. an extension to Flixborough Wharf; ii. the reopening of a 9km single track railway line that connects Flixborough Wharf with the steel works at Scunthorpe; iii. a railhead complex to handle the RDF and concrete products; and iv. a new road alignment to facilitate the flow of traffic accessing the site from the south.',
	publishStatus: 'published',
	sector: 'EN - Energy',
	projectType: 'EN01 - Generating Stations',
	sourceSystem: 'ODT',
	stage: 'pre_application',
	projectLocation: 'Flixborough Wharf, Flixborough Industrial Estate, North Lincolnshire.',
	projectEmailAddress: 'webteam@planninginspectorate.gov.uk',
	regions: 'yorkshire_and_the_humber',
	transboundary: null,
	easting: 485899,
	northing: 414508,
	welshLanguage: 0,
	mapZoomLevel: 'region',
	secretaryOfState: null,
	anticipatedDateOfSubmission: '2023-01-01',
	anticipatedSubmissionDateNonSpecific: 'Q1 2023',
	confirmedDateOfDecision: '2023-11-01',
	confirmedStartOfExamination: '2023-07-01',
	dateOfDCOAcceptance: '2023-02-01',
	dateOfDCOSubmission: '2023-01-02',
	dateOfNonAcceptance: null,
	dateOfRecommendations: '2023-10-01',
	dateOfRelevantRepresentationClose: '2023-05-31',
	dateOfRepresentationPeriodOpen: '2023-05-01',
	datePINSFirstNotifiedOfProject: null,
	dateProjectAppearsOnWebsite: null,
	dateProjectWithdrawn: null,
	dateRRepAppearOnWebsite: '2023-09-01',
	dateSection58NoticeReceived: null,
	dateTimeExaminationEnds: '2023-06-01',
	deadlineForAcceptanceDecision: '2023-01-30',
	deadlineForCloseOfExamination: null,
	deadlineForDecision: null,
	deadlineForSubmissionOfRecommendation: null,
	examinationTimetableId: null,
	extensionToDateRelevantRepresentationsClose: null,
	jRPeriodEndDate: null,
	preliminaryMeetingStartDate: '2023-03-01',
	scopingOpinionIssued: null,
	scopingOpinionSought: null,
	screeningOpinionIssued: null,
	screeningOpinionSought: null,
	section46Notification: null,
	stage4ExtensionToExamCloseDate: '2023-06-14',
	stage5ExtensionToDecisionDeadline: '2023-11-14',
	stage5ExtensionToRecommendationDeadline: '2023-10-14',
	createdAt: '2023-04-14 15:52:45.9033333',
	modifiedAt: '2023-04-18 09:43:07.3020000',
	applicant: {
		firstName: 'Joe',
		lastName: 'Bloggs',
		organisationName: 'North Lincolnshire Green Energy Park Limited',
		email: 'joe.bloggs@planninginspectorate.gov.uk',
		phoneNumber: '01314960000',
		webAddress: 'https://northlincolnshiregreenenergypark.co.uk/'
	}
};

// application data as stored in NI database
const APPLICATION_FO = {
	CaseReference: 'EN010116',
	ProjectName: 'North Lincolnshire Green Energy Park',
	Proposal: 'EN01 - Generating Stations',
	Summary:
		'The Project consists of an Energy Recovery Facility (ERF) converting up to 650,000 tonnes per annum of Refuse Derived Fuel (RDF) to generate a maximum of 95 Mega Watts of electrical output (MWe) and/or 380 Mega Watts of thermal output (MWt) to provide power, heat and steam on the site of the operating Flixborough Wharf on the River Trent. The Project will incorporate battery storage, hydrogen production from the electrolysis of water, hydrogen storage, heat and steam storage. It will also include heat-treatment of bottom and fly ash, concrete block manufacturing, carbon dioxide capture and utilisation and an extended district heat network of 5km, power and gas network to service the nearby proposed housing development. Development at the site will also include the following associated measures to allow access to and from the site by road, rail or river, with a correspondingly reduced environmental impact: i. an extension to Flixborough Wharf; ii. the reopening of a 9km single track railway line that connects Flixborough Wharf with the steel works at Scunthorpe; iii. a railhead complex to handle the RDF and concrete products; and iv. a new road alignment to facilitate the flow of traffic accessing the site from the south.',
	Stage: 1,
	PromoterName: 'North Lincolnshire Green Energy Park Limited',
	PromoterFirstName: 'Joe',
	PromoterLastName: 'Bloggs',
	ApplicantEmailAddress: 'joe.bloggs@planninginspectorate.gov.uk',
	ApplicantPhoneNumber: '01314960000',
	WebAddress: 'https://northlincolnshiregreenenergypark.co.uk/',
	ProjectEmailAddress: 'webteam@planninginspectorate.gov.uk',
	Region: 'Yorkshire and the Humber',
	ProjectLocation: 'Flixborough Wharf, Flixborough Industrial Estate, North Lincolnshire.',
	AnticipatedGridRefEasting: 485899,
	AnticipatedGridRefNorthing: 414508,
	MapZoomLevel: 'Region',
	LatLong: '53.620079146110655,-0.7028315466694124',
	AnticipatedDateOfSubmission: '2023-01-01',
	AnticipatedSubmissionDateNonSpecific: 'Q1 2023',
	DateOfDCOSubmission: '2023-01-02',
	DateOfDCOAcceptance_NonAcceptance: '2023-02-01',
	DateOfPreliminaryMeeting: '2023-03-01',
	ConfirmedStartOfExamination: '2023-07-01',
	DateTimeExaminationEnds: '2023-06-01',
	DateOfRepresentationPeriodOpen: '2023-05-01',
	DateOfRelevantRepresentationClose: '2023-05-31',
	DateRRepAppearOnWebsite: '2023-09-01',
	Stage4ExtensiontoExamCloseDate: '2023-06-14',
	stage5ExtensionToRecommendationDeadline: '2023-10-14',
	Stage5ExtensiontoDecisionDeadline: '2023-11-14',
	DateOfRecommendations: '2023-10-01',
	ConfirmedDateOfDecision: '2023-11-01',
	DateProjectWithdrawn: null,
	sourceSystem: 'HORIZON',
	dateOfNonAcceptance: null
};

// application data as currently returned by /applications/{caseReference} endpoints.
// To be deprecated in favour of new format as seen below in APPLICATION_API
const APPLICATION_API_V1 = {
	...omit(APPLICATION_FO, ['LatLong']),
	LongLat: ['-0.7028315466694124', '53.620079146110655'],
	MapZoomLevel: 1,
	Region: 'Yorkshire and the Humber'
};

// application data in generalised format, to be returned by api
const APPLICATION_API = {
	caseReference: 'EN010116',
	projectName: 'North Lincolnshire Green Energy Park',
	projectType: 'EN01 - Generating Stations',
	projectDescription:
		'The Project consists of an Energy Recovery Facility (ERF) converting up to 650,000 tonnes per annum of Refuse Derived Fuel (RDF) to generate a maximum of 95 Mega Watts of electrical output (MWe) and/or 380 Mega Watts of thermal output (MWt) to provide power, heat and steam on the site of the operating Flixborough Wharf on the River Trent. The Project will incorporate battery storage, hydrogen production from the electrolysis of water, hydrogen storage, heat and steam storage. It will also include heat-treatment of bottom and fly ash, concrete block manufacturing, carbon dioxide capture and utilisation and an extended district heat network of 5km, power and gas network to service the nearby proposed housing development. Development at the site will also include the following associated measures to allow access to and from the site by road, rail or river, with a correspondingly reduced environmental impact: i. an extension to Flixborough Wharf; ii. the reopening of a 9km single track railway line that connects Flixborough Wharf with the steel works at Scunthorpe; iii. a railhead complex to handle the RDF and concrete products; and iv. a new road alignment to facilitate the flow of traffic accessing the site from the south.',
	projectLocation: 'Flixborough Wharf, Flixborough Industrial Estate, North Lincolnshire.',
	projectEmailAddress: 'webteam@planninginspectorate.gov.uk',
	applicantName: 'North Lincolnshire Green Energy Park Limited',
	applicantFirstName: 'Joe',
	applicantLastName: 'Bloggs',
	applicantEmailAddress: 'joe.bloggs@planninginspectorate.gov.uk',
	applicantPhoneNumber: '01314960000',
	applicantWebsite: 'https://northlincolnshiregreenenergypark.co.uk/',
	easting: 485899,
	northing: 414508,
	longLat: ['-0.7028315466694124', '53.620079146110655'],
	mapZoomLevel: 1,
	regions: ['yorkshire_and_the_humber'],
	sector: 'energy',
	stage: 'pre_application',
	anticipatedDateOfSubmission: '2023-01-01',
	anticipatedSubmissionDateNonSpecific: 'Q1 2023',
	confirmedDateOfDecision: '2023-11-01',
	confirmedStartOfExamination: '2023-07-01',
	dateOfDCOAcceptance: '2023-02-01',
	dateOfDCOSubmission: '2023-01-02',
	dateOfNonAcceptance: null,
	dateOfRecommendations: '2023-10-01',
	dateOfRelevantRepresentationClose: '2023-05-31',
	dateOfRepresentationPeriodOpen: '2023-05-01',
	dateProjectAppearsOnWebsite: null,
	dateProjectWithdrawn: null,
	dateRRepAppearOnWebsite: '2023-09-01',
	dateTimeExaminationEnds: '2023-06-01',
	deadlineForAcceptanceDecision: '2023-01-30',
	preliminaryMeetingStartDate: '2023-03-01',
	sourceSystem: 'abc',
	stage4ExtensionToExamCloseDate: '2023-06-14',
	stage5ExtensionToDecisionDeadline: '2023-11-14',
	stage5ExtensionToRecommendationDeadline: '2023-10-14',
	deadlineForDecision: null,
	deadlineForSubmissionOfRecommendation: null
};

const APPLICATIONS_NI_DB = [
	{
		CaseReference: 'BC080001',
		ProjectName: 'The London Resort',
		Proposal: 'BC08 - Leisure',
		ProjectLocation: 'Swanscombe Peninsula and land adjacent to Ebbsfleet Station',
		Stage: 1,
		PromoterName: 'London Resort Company Holdings',
		PromoterFirstName: 'Chris',
		PromoterLastName: 'Potts',
		ApplicantEmailAddress: 'CPotts@savills.com',
		ApplicantPhoneNumber: '020 3320 8255',
		Summary:
			'Leisure and entertainment resort including a theme park, hotels, bars, restaurants, business space, training academy, monorail and associated infrastructure works. The application is anticipated to be submitted to the Planning Inspectorate in 2020.',
		ProjectEmailAddress: 'LondonResort@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q4 2020',
		DateOfRepresentationPeriodOpen: '0000-00-00',
		DateOfRelevantRepresentationClose: '0000-00-00',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '0000-00-00',
		ConfirmedDateOfDecision: '0000-00-00',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 'County',
		AnticipatedGridRefEasting: 560700,
		AnticipatedGridRefNorthing: 175522,
		LatLong: '51.455348871558, 0.31323952875368',
		Region: 'South East',
		DateOfDCOSubmission: '0000-00-00',
		DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
		WebAddress: '',
		DateRRepAppearOnWebsite: '0000-00-00',
		DateTimeExaminationEnds: '0000-00-00 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN030001',
		ProjectName: 'Preesall Saltfield Underground Gas Storage',
		Proposal: 'EN03 - Underground Gas Storage Facilities',
		ProjectLocation: 'Preesall Saltfield, Over Wyre, Lancashire.',
		Stage: 7,
		PromoterName: 'Halite Energy Group Ltd',
		PromoterFirstName: 'Adrian',
		PromoterLastName: 'James',
		ApplicantEmailAddress: 'Adrian.James@bartonwillmore.co.uk',
		ApplicantPhoneNumber: '01223345555',
		Summary:
			'Underground gas storage facility to store gas in, extract gas from and inject gas into, with a total storage capacity up to 900 million standard cubic metres and working capacity of up to 600 million cubic metres, both specified at standard temperatures and pressures, comprising: (i) up to 19 operational caverns formed by solution mining of the Preesall halite deposit all to be constructed to any extent downwards below 220 metres below ground surface and to be confined in the Preesall halite deposit. (ii) 7 multiple wellhead compounds to create the underground salt caverns and, once operational, to connect the gas manifolds. (iii) Gas Compressor Compound comprising pig launchers and receivers; slug catchers; above ground high.',
		ProjectEmailAddress: 'nienquires@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'November 2011',
		DateOfRepresentationPeriodOpen: '2012-01-04',
		DateOfRelevantRepresentationClose: '2012-02-10',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '2012-04-24',
		ConfirmedDateOfDecision: '2013-04-09',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '2013-01-22',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 'Region',
		AnticipatedGridRefEasting: 335999,
		AnticipatedGridRefNorthing: 446002,
		LatLong: '53.906018503104, -2.9742913669906',
		Region: 'North West',
		DateOfDCOSubmission: '2011-12-01',
		DateOfDCOAcceptance_NonAcceptance: '2011-12-23',
		WebAddress: 'http://www.halite-energy.co.uk/',
		DateRRepAppearOnWebsite: '2012-02-17',
		DateTimeExaminationEnds: '2012-10-24 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010001',
		ProjectName: 'Hinkley Point C New Nuclear Power Station',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation: 'Hinkley Point Somerset',
		Stage: 7,
		PromoterName: 'NNB Generation Company Limited',
		PromoterFirstName: 'Carly',
		PromoterLastName: 'Vince',
		ApplicantEmailAddress: 'carly.vince@edf-energy.com',
		ApplicantPhoneNumber: '0800 197 6102',
		Summary:
			'The proposal is for a nuclear power station with two nuclear reactors capable of generating a total of up to 3,260MW of electricity at Hinkley Point C and associated development.',
		ProjectEmailAddress: 'HPCNuclear@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q3 2011',
		DateOfRepresentationPeriodOpen: '2011-12-02',
		DateOfRelevantRepresentationClose: '2012-01-23',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '2012-03-22',
		ConfirmedDateOfDecision: '2013-03-19',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '2012-12-19',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 'County',
		AnticipatedGridRefEasting: 321217,
		AnticipatedGridRefNorthing: 146033,
		LatLong: '51.207547796017, -3.1279139292638',
		Region: 'South West',
		DateOfDCOSubmission: '2011-10-31',
		DateOfDCOAcceptance_NonAcceptance: '2011-11-24',
		WebAddress: 'http://hinkleypoint.edfenergyconsultation.info/',
		DateRRepAppearOnWebsite: '2012-02-07',
		DateTimeExaminationEnds: '2012-09-21 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010012',
		ProjectName: 'Sizewell C New Nuclear Power Station',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation: 'Near Leiston in Suffolk',
		Stage: 1,
		PromoterName: 'EdF Energy',
		PromoterFirstName: 'Carly',
		PromoterLastName: 'Vince',
		ApplicantEmailAddress: 'richard.bull@edf-energy.com',
		ApplicantPhoneNumber: '0800 197 6102',
		Summary: 'New Nuclear Power Station',
		ProjectEmailAddress: 'sizewellc@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q1 2020',
		DateOfRepresentationPeriodOpen: '0000-00-00',
		DateOfRelevantRepresentationClose: '0000-00-00',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '0000-00-00',
		ConfirmedDateOfDecision: '0000-00-00',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: null,
		AnticipatedGridRefEasting: 647073,
		AnticipatedGridRefNorthing: 262746,
		LatLong: '52.207044854054, 1.6166447707429',
		Region: 'Eastern',
		DateOfDCOSubmission: '0000-00-00',
		DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
		WebAddress: 'http://sizewell.edfenergyconsultation.info/',
		DateRRepAppearOnWebsite: '0000-00-00',
		DateTimeExaminationEnds: '0000-00-00 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010085',
		ProjectName: 'Cleve Hill Solar Park',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation:
			'Land approximately 2 km northeast of Faversham and 5 km west of Whitstable on the North Kent Coast.',
		Stage: 5,
		PromoterName: 'Cleve Hill Solar Park Ltd',
		PromoterFirstName: 'Hugh',
		PromoterLastName: 'Brennan',
		ApplicantEmailAddress: 'info@clevehillsolar.com',
		ApplicantPhoneNumber: '0800 328 2850',
		Summary:
			'Solar photovoltaic array, and electrical storage and connection infrastructure, with a generation capacity of greater than 50 MW',
		ProjectEmailAddress: 'CleveHillSolarPark@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q4 2018',
		DateOfRepresentationPeriodOpen: '2018-12-19',
		DateOfRelevantRepresentationClose: '2019-01-28',
		DateOfPreliminaryMeeting: '2019-05-30',
		ConfirmedStartOfExamination: '2019-05-30',
		ConfirmedDateOfDecision: '0000-00-00',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 'Region',
		AnticipatedGridRefEasting: 603781,
		AnticipatedGridRefNorthing: 163999,
		LatLong: '51.337996813539, 0.92598581618291',
		Region: 'South East',
		DateOfDCOSubmission: '2018-11-16',
		DateOfDCOAcceptance_NonAcceptance: '2018-12-14',
		WebAddress: 'www.clevehillsolar.com',
		DateRRepAppearOnWebsite: '2019-01-30',
		DateTimeExaminationEnds: '2019-11-30 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	}
];

const APPLICATIONS_FO = [
	{
		CaseReference: 'BC080001',
		ProjectName: 'The London Resort',
		Proposal: 'BC08 - Leisure',
		ProjectLocation: 'Swanscombe Peninsula and land adjacent to Ebbsfleet Station',
		Stage: 1,
		PromoterName: 'London Resort Company Holdings',
		PromoterFirstName: 'Chris',
		PromoterLastName: 'Potts',
		ApplicantEmailAddress: 'CPotts@savills.com',
		ApplicantPhoneNumber: '020 3320 8255',
		Summary:
			'Leisure and entertainment resort including a theme park, hotels, bars, restaurants, business space, training academy, monorail and associated infrastructure works. The application is anticipated to be submitted to the Planning Inspectorate in 2020.',
		ProjectEmailAddress: 'LondonResort@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q4 2020',
		DateOfRepresentationPeriodOpen: '0000-00-00',
		DateOfRelevantRepresentationClose: '0000-00-00',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '0000-00-00',
		ConfirmedDateOfDecision: null,
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 2,
		AnticipatedGridRefEasting: 560700,
		AnticipatedGridRefNorthing: 175522,
		LongLat: ['0.31323952875368', '51.455348871558'],
		Region: 'South East',
		DateOfDCOSubmission: null,
		DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
		WebAddress: '',
		DateRRepAppearOnWebsite: '0000-00-00',
		DateTimeExaminationEnds: '0000-00-00 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN030001',
		ProjectName: 'Preesall Saltfield Underground Gas Storage',
		Proposal: 'EN03 - Underground Gas Storage Facilities',
		ProjectLocation: 'Preesall Saltfield, Over Wyre, Lancashire.',
		Stage: 7,
		PromoterName: 'Halite Energy Group Ltd',
		PromoterFirstName: 'Adrian',
		PromoterLastName: 'James',
		ApplicantEmailAddress: 'Adrian.James@bartonwillmore.co.uk',
		ApplicantPhoneNumber: '01223345555',
		Summary:
			'Underground gas storage facility to store gas in, extract gas from and inject gas into, with a total storage capacity up to 900 million standard cubic metres and working capacity of up to 600 million cubic metres, both specified at standard temperatures and pressures, comprising: (i) up to 19 operational caverns formed by solution mining of the Preesall halite deposit all to be constructed to any extent downwards below 220 metres below ground surface and to be confined in the Preesall halite deposit. (ii) 7 multiple wellhead compounds to create the underground salt caverns and, once operational, to connect the gas manifolds. (iii) Gas Compressor Compound comprising pig launchers and receivers; slug catchers; above ground high.',
		ProjectEmailAddress: 'nienquires@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'November 2011',
		DateOfRepresentationPeriodOpen: '2012-01-04',
		DateOfRelevantRepresentationClose: '2012-02-10',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '2012-04-24',
		ConfirmedDateOfDecision: '2013-04-09',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '2013-01-22',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 1,
		AnticipatedGridRefEasting: 335999,
		AnticipatedGridRefNorthing: 446002,
		LongLat: ['-2.9742913669906', '53.906018503104'],
		Region: 'North West',
		DateOfDCOSubmission: '2011-12-01',
		DateOfDCOAcceptance_NonAcceptance: '2011-12-23',
		WebAddress: 'http://www.halite-energy.co.uk/',
		DateRRepAppearOnWebsite: '2012-02-17',
		DateTimeExaminationEnds: '2012-10-24 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010001',
		ProjectName: 'Hinkley Point C New Nuclear Power Station',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation: 'Hinkley Point Somerset',
		Stage: 7,
		PromoterName: 'NNB Generation Company Limited',
		PromoterFirstName: 'Carly',
		PromoterLastName: 'Vince',
		ApplicantEmailAddress: 'carly.vince@edf-energy.com',
		ApplicantPhoneNumber: '0800 197 6102',
		Summary:
			'The proposal is for a nuclear power station with two nuclear reactors capable of generating a total of up to 3,260MW of electricity at Hinkley Point C and associated development.',
		ProjectEmailAddress: 'HPCNuclear@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q3 2011',
		DateOfRepresentationPeriodOpen: '2011-12-02',
		DateOfRelevantRepresentationClose: '2012-01-23',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '2012-03-22',
		ConfirmedDateOfDecision: '2013-03-19',
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '2012-12-19',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 2,
		AnticipatedGridRefEasting: 321217,
		AnticipatedGridRefNorthing: 146033,
		LongLat: ['-3.1279139292638', '51.207547796017'],
		Region: 'South West',
		DateOfDCOSubmission: '2011-10-31',
		DateOfDCOAcceptance_NonAcceptance: '2011-11-24',
		WebAddress: 'http://hinkleypoint.edfenergyconsultation.info/',
		DateRRepAppearOnWebsite: '2012-02-07',
		DateTimeExaminationEnds: '2012-09-21 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010012',
		ProjectName: 'Sizewell C New Nuclear Power Station',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation: 'Near Leiston in Suffolk',
		Stage: 1,
		PromoterName: 'EdF Energy',
		PromoterFirstName: 'Carly',
		PromoterLastName: 'Vince',
		ApplicantEmailAddress: 'richard.bull@edf-energy.com',
		ApplicantPhoneNumber: '0800 197 6102',
		Summary: 'New Nuclear Power Station',
		ProjectEmailAddress: 'sizewellc@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q1 2020',
		DateOfRepresentationPeriodOpen: '0000-00-00',
		DateOfRelevantRepresentationClose: '0000-00-00',
		DateOfPreliminaryMeeting: '0000-00-00',
		ConfirmedStartOfExamination: '0000-00-00',
		ConfirmedDateOfDecision: null,
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 0,
		AnticipatedGridRefEasting: 647073,
		AnticipatedGridRefNorthing: 262746,
		LongLat: ['1.6166447707429', '52.207044854054'],
		Region: 'Eastern',
		DateOfDCOSubmission: null,
		DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
		WebAddress: 'http://sizewell.edfenergyconsultation.info/',
		DateRRepAppearOnWebsite: '0000-00-00',
		DateTimeExaminationEnds: '0000-00-00 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	},
	{
		CaseReference: 'EN010085',
		ProjectName: 'Cleve Hill Solar Park',
		Proposal: 'EN01 - Generating Stations',
		ProjectLocation:
			'Land approximately 2 km northeast of Faversham and 5 km west of Whitstable on the North Kent Coast.',
		Stage: 5,
		PromoterName: 'Cleve Hill Solar Park Ltd',
		PromoterFirstName: 'Hugh',
		PromoterLastName: 'Brennan',
		ApplicantEmailAddress: 'info@clevehillsolar.com',
		ApplicantPhoneNumber: '0800 328 2850',
		Summary:
			'Solar photovoltaic array, and electrical storage and connection infrastructure, with a generation capacity of greater than 50 MW',
		ProjectEmailAddress: 'CleveHillSolarPark@planninginspectorate.gov.uk',
		AnticipatedDateOfSubmission: '0000-00-00',
		AnticipatedSubmissionDateNonSpecific: 'Q4 2018',
		DateOfRepresentationPeriodOpen: '2018-12-19',
		DateOfRelevantRepresentationClose: '2019-01-28',
		DateOfPreliminaryMeeting: '2019-05-30',
		ConfirmedStartOfExamination: '2019-05-30',
		ConfirmedDateOfDecision: null,
		Stage5ExtensiontoDecisionDeadline: '0000-00-00',
		DateOfRecommendations: '0000-00-00',
		DateProjectWithdrawn: '0000-00-00',
		MapZoomLevel: 1,
		AnticipatedGridRefEasting: 603781,
		AnticipatedGridRefNorthing: 163999,
		LongLat: ['0.92598581618291', '51.337996813539'],
		Region: 'South East',
		DateOfDCOSubmission: '2018-11-16',
		DateOfDCOAcceptance_NonAcceptance: '2018-12-14',
		WebAddress: 'www.clevehillsolar.com',
		DateRRepAppearOnWebsite: '2019-01-30',
		DateTimeExaminationEnds: '2019-11-30 00:00:00',
		Stage4ExtensiontoExamCloseDate: '0000-00-00',
		sourceSystem: null,
		dateOfNonAcceptance: null
	}
];

const APPLICATIONS_NI_FILTER_COLUMNS = [
	{ Stage: 1, Region: 'South East', Proposal: 'BC08 - Leisure' },
	{
		Stage: 7,
		Region: 'North West',
		Proposal: 'EN03 - Underground Gas Storage Facilities'
	},
	{
		Stage: 7,
		Region: 'South West',
		Proposal: 'EN01 - Generating Stations'
	},
	{ Stage: 1, Region: 'Eastern', Proposal: 'EN01 - Generating Stations' },
	{ Stage: 5, Region: 'South East', Proposal: 'EN01 - Generating Stations' }
];

const APPLICATIONS_BO_FILTER_COLUMNS = [
	{
		stage: 'pre_application',
		regions: 'south_east',
		sector: 'BC - Business and Commercial'
	},
	{
		stage: 'recommendation',
		regions: 'north_west',
		sector: 'EN - Energy'
	},
	{
		stage: 'post_decision',
		regions: 'south_west',
		sector: 'EN - Energy'
	},
	{
		stage: 'pre_application',
		regions: 'eastern',
		sector: 'EN - Energy'
	},
	{
		stage: 'post_decision',
		regions: 'south_east',
		sector: 'EN - Energy'
	}
];

const APPLICATIONS_FO_FILTERS = [
	{
		name: 'stage',
		label: 'Pre-application',
		label_cy: 'Cyn-ymgeisio',
		value: 'pre_application',
		count: 2
	},
	{
		name: 'stage',
		label: 'Recommendation',
		label_cy: 'Argymhelliad',
		value: 'recommendation',
		count: 1
	},
	{
		name: 'stage',
		label: 'Post-decision',
		label_cy: 'Ôl-benderfyniad',
		value: 'post_decision',
		count: 2
	},
	{ name: 'region', label: 'South East', label_cy: 'Y De-ddwyrain', value: 'south_east', count: 2 },
	{
		name: 'region',
		label: 'North West',
		label_cy: 'Y Gogledd-orllewin',
		value: 'north_west',
		count: 1
	},
	{ name: 'region', label: 'South West', label_cy: 'Y De-orllewin', value: 'south_west', count: 1 },
	{ name: 'region', label: 'Eastern', label_cy: 'Dwyreiniol', value: 'eastern', count: 1 },
	{
		name: 'sector',
		label: 'Business and Commercial',
		label_cy: 'Busnes a Masnachol',
		value: 'business_and_commercial',
		count: 1
	},
	{ name: 'sector', label: 'Energy', label_cy: 'Ynni', value: 'energy', count: 4 }
];

module.exports = {
	APPLICATION_DB,
	APPLICATION_FO,
	APPLICATIONS_NI_DB,
	APPLICATIONS_NI_FILTER_COLUMNS,
	APPLICATIONS_BO_FILTER_COLUMNS,
	APPLICATIONS_FO,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_API_V1,
	APPLICATION_API
};
