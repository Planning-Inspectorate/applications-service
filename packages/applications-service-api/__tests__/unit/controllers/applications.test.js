/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getApplication, getAllApplications } = require('../../../src/controllers/applications');
const ApiError = require('../../../src/error/apiError');

const projectData = {
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
  MapZoomLevel: 'Region',
  AnticipatedDateOfSubmission: '0000-00-00',
  AnticipatedSubmissionDateNonSpecific: 'Q3 2021',
  DateOfDCOSubmission: '0000-00-00',
  DateOfDCOAcceptance_NonAcceptance: '0000-00-00',
  DateOfPreliminaryMeeting: '0000-00-00',
  ConfirmedStartOfExamination: '0000-00-00',
  DateTimeExaminationEnds: null,
  DateOfRepresentationPeriodOpen: '0000-00-00',
  DateOfRelevantRepresentationClose: '0000-00-00',
  DateRRepAppearOnWebsite: '0000-00-00',
  Stage4ExtensiontoExamCloseDate: '0000-00-00',
  stage5ExtensionToRecommendationDeadline: '0000-00-00',
  Stage5ExtensiontoDecisionDeadline: '0000-00-00',
  DateOfRecommendations: '0000-00-00',
  ConfirmedDateOfDecision: '0000-00-00',
  DateProjectWithdrawn: '0000-00-00',
  sourceSystem: null,
  dateOfNonAcceptance: null,
};

jest.mock('../../../src/models', () => {
  // eslint-disable-next-line global-require
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Project = dbMock.define('Project');

  // eslint-disable-next-line consistent-return
  Project.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findOne') {
      if (queryOptions[0].where.CaseReference === 'EN010116') {
        return Project.build({ ...projectData });
      }
      return null;
    }
    if (query === 'findAll') {
      return [Project.build({ ...projectData })];
    }
  });
  const db = {
    Project,
  };
  return db;
});

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(JSON.stringify(['EN000000', 'EN010116'])),
  },
}));

describe('getApplication', () => {
  it('should get application from mock', async () => {
    const req = httpMocks.createRequest({
      params: {
        id: 'EN010116',
      },
    });

    const res = httpMocks.createResponse();
    await getApplication(req, res);
    const data = res._getData();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(projectData);
  });

  it('should throw application not eligible', async () => {
    const req = httpMocks.createRequest({
      params: {
        id: 'EN010009',
      },
    });

    const res = httpMocks.createResponse();

    await expect(() => getApplication(req, res)).rejects.toEqual(
      new ApiError(StatusCodes.NOT_ACCEPTABLE, { errors: ['Application EN010009 is not eligible'] })
    );
  });

  it('should return application not found', async () => {
    const req = httpMocks.createRequest({
      params: {
        id: 'EN000000',
      },
    });

    const res = httpMocks.createResponse();
    await getApplication(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({ code: 404, errors: ['Application EN000000 was not found'] });
  });
});

describe('getAllApplications', () => {
  it('should get all applications from mock', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    await getAllApplications(req, res);
    const data = res._getData();
    const dataValue = data[0].dataValues;
    delete dataValue.id;
    delete dataValue.createdAt;
    delete dataValue.updatedAt;
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data.length).toBe(1);
    expect(dataValue).toEqual({ ...projectData });
  });
});
