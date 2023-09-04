/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
} = require('../../../src/controllers/applications');
const { APPLICATION_FO } = require('../../__data__/application');

jest.mock('../../../src/services/application.service');
const mockGetApplicationService =
	require('../../../src/services/application.service').getApplication;

jest.mock('../../../src/services/application.service');
const mockGetAllApplications =
	require('../../../src/services/application.service').getAllApplications;

const mockGetAllApplicationsDownloadInBatches =
	require('../../../src/services/application.service').getAllApplicationsDownloadInBatches;

const project = {
	CaseReference: 'EN010116',
	ProjectName: 'North Lincolnshire Green Energy Park',
	Proposal: 'EN01 - Generating Stations',
	Summary:
		'The Project consists of an Energy Recovery Facility (ERF) converting up to 650,000 tonnes per annum of Refuse Derived Fuel (RDF) to generate a maximum of 95 Mega Watts of electrical output (MWe) and/or 380 Mega Watts of thermal output (MWt) to provide power, heat and steam on the site of the operating Flixborough Wharf on the River Trent. The Project will incorporate battery storage, hydrogen production from the electrolysis of water, hydrogen storage, heat and steam storage. It will also include heat-treatment of bottom and fly ash, concrete block manufacturing, carbon dioxide capture and utilisation and an extended district heat network of 5km, power and gas network to service the nearby proposed housing development. Development at the site will also include the following associated measures to allow access to and from the site by road, rail or river, with a correspondingly reduced environmental impact: i. an extension to Flixborough Wharf; ii. the reopening of a 9km single track railway line that connects Flixborough Wharf with the steel works at Scunthorpe; iii. a railhead complex to handle the RDF and concrete products; and iv. a new road alignment to facilitate the flow of traffic accessing the site from the south.',
	PromoterName: 'North Lincolnshire Green Energy Park Limited',
	PromoterFirstName: '',
	PromoterLastName: '',
	ApplicantEmailAddress: 'chris.bungay@planninginspectorate.gov.uk',
	ApplicantPhoneNumber: '',
	WebAddress: 'https://northlincolnshiregreenenergypark.co.uk/',
	ProjectEmailAddress: 'webteam@planninginspectorate.gov.uk',
	Region: 'Yorkshire and the Humber',
	ProjectLocation: 'Flixborough Wharf, Flixborough Industrial Estate, North Lincolnshire.',
	AnticipatedGridRefEasting: 485899,
	AnticipatedGridRefNorthing: 414508,
	MapZoomLevel: 6,
	LongLat: ['-0.70283147423378', '53.620078025496'],
	AnticipatedDateOfSubmission: '0000-00-00',
	AnticipatedSubmissionDateNonSpecific: 'Q3 2021',
	DateOfDCOSubmission: '0000-00-00',
	DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
	DateOfPreliminaryMeeting: '0000-00-00',
	ConfirmedStartOfExamination: '0000-00-00',
	DateTimeExaminationEnds: null,
	DateOfRepresentationPeriodOpen: '0000-00-00',
	DateOfRelevantRepresentationClose: '2024-08-01',
	DateRRepAppearOnWebsite: '0000-00-00',
	Stage4ExtensiontoExamCloseDate: '0000-00-00',
	stage5ExtensionToRecommendationDeadline: '0000-00-00',
	Stage5ExtensiontoDecisionDeadline: '0000-00-00',
	DateOfRecommendations: '0000-00-00',
	ConfirmedDateOfDecision: '0000-00-00',
	DateProjectWithdrawn: '0000-00-00',
	sourceSystem: null,
	dateOfNonAcceptance: null
};

describe('getApplication', () => {
	afterEach(() => mockGetApplicationService.mockClear());

	it('should get application from mock', async () => {
		mockGetApplicationService.mockResolvedValueOnce({
			...APPLICATION_FO,
			MapZoomLevel: 6,
			LatLong: undefined,
			LongLat: ['-0.70283147423378', '53.620078025496']
		});

		const req = httpMocks.createRequest({
			params: {
				caseReference: 'EN010116'
			}
		});

		const res = httpMocks.createResponse();
		await getApplication(req, res);
		const data = res._getData();
		delete data.id;
		delete data.createdAt;
		delete data.updatedAt;
		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(data).toEqual(project);
	});

	it('should throw application not found', async () => {
		mockGetApplicationService.mockResolvedValueOnce(null);

		const req = httpMocks.createRequest({
			params: {
				caseReference: 'EN000000'
			}
		});
		const res = httpMocks.createResponse();

		await expect(getApplication(req, res)).rejects.toEqual({
			code: 404,
			message: {
				errors: ['Application EN000000 was not found']
			}
		});
	});
});

describe('getAllApplications', () => {
	afterEach(() => mockGetApplicationService.mockClear());

	it('should get all applications from mock', async () => {
		mockGetAllApplications.mockResolvedValue({
			applications: [
				{
					...APPLICATION_FO,
					MapZoomLevel: 6,
					LatLong: undefined,
					LongLat: ['-0.70283147423378', '53.620078025496']
				}
			],
			totalItems: 1,
			currentPage: 1,
			itemsPerPage: 25,
			totalPages: 1
		});

		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();

		await getAllApplications(req, res);

		const { applications } = res._getData();
		const dataValue = applications[0];
		delete dataValue.id;
		delete dataValue.createdAt;
		delete dataValue.updatedAt;

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(applications.length).toBe(1);
		expect(dataValue).toEqual({ ...project });
	});
});

describe('getAllApplicationsDownload', () => {
	afterEach(() => mockGetApplicationService.mockClear());

	it('should get all applications from mock', async () => {
		mockGetAllApplicationsDownloadInBatches.mockImplementation((readableStream) => {
			const mockApplications = [
				{
					...APPLICATION_FO,
					MapZoomLevel: 6,
					LatLong: undefined,
					LongLat: ['-0.70283147423378', '53.620078025496']
				}
			];
			mockApplications.setCSVHeader = true;
			readableStream.push(mockApplications);
			readableStream.push(null);
		});

		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

		await getAllApplicationsDownload(req, res);
		// mock wait 4 seconds
		await new Promise((resolve) => setTimeout(resolve, 4000));
		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		const applicationsCSV = res._getData();
		const applicationsCSVArray = applicationsCSV.split('\n');
		expect;
		expect(applicationsCSVArray.length).toBe(3);
		expect(applicationsCSVArray[0]).toBe(
			'"Project reference","Project name","Applicant name","Application type","Region","Location","Grid reference - Easting","Grid reference - Northing:","GPS co-ordinates","Stage","Description","Anticipated submission date","Anticipated submission period","Date of application","Date application accepted","Date Examination started","Date Examination closed","Date of recommendation","Date of decision","Date withdrawn"'
		);
		expect(applicationsCSVArray[1]).toBe(
			`"EN010116","North Lincolnshire Green Energy Park","North Lincolnshire Green Energy Park Limited","EN01 - Generating Stations","Yorkshire and the Humber","Flixborough Wharf, Flixborough Industrial Estate, North Lincolnshire.",485899,414508,"'-0.70283147423378, 53.620078025496",,"The Project consists of an Energy Recovery Facility (ERF) converting up to 650,000 tonnes per annum of Refuse Derived Fuel (RDF) to generate a maximum of 95 Mega Watts of electrical output (MWe) and/or 380 Mega Watts of thermal output (MWt) to provide power, heat and steam on the site of the operating Flixborough Wharf on the River Trent. The Project will incorporate battery storage, hydrogen production from the electrolysis of water, hydrogen storage, heat and steam storage. It will also include heat-treatment of bottom and fly ash, concrete block manufacturing, carbon dioxide capture and utilisation and an extended district heat network of 5km, power and gas network to service the nearby proposed housing development. Development at the site will also include the following associated measures to allow access to and from the site by road, rail or river, with a correspondingly reduced environmental impact: i. an extension to Flixborough Wharf; ii. the reopening of a 9km single track railway line that connects Flixborough Wharf with the steel works at Scunthorpe; iii. a railhead complex to handle the RDF and concrete products; and iv. a new road alignment to facilitate the flow of traffic accessing the site from the south.","0000-00-00","Q3 2021","0000-00-00","0000-00-00","0000-00-00",,"0000-00-00","0000-00-00","0000-00-00"`
		);
		expect(applicationsCSVArray[2]).toBe('');
	});
});
