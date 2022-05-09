const controller = require('../../../../src/controllers/projects/representations');
const { searchRepresentations } = require('../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/representations', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = mockReq();
    res = mockRes();
  });

  const representations = [
    {
      ID: 2,
      ProjectName: 'SPT Feb 2020',
      CaseReference: 'EN010009',
      DataID: null,
      UniqueReference: 'WS010006-34601',
      WebReference: null,
      PersonalName: 'Test (Test)',
      Representative: null,
      IndvdlOnBhalfName: null,
      OrgOnBhalfName: null,
      AgentOrgOnBhalfContactName: null,
      RepFrom: 'Members of the Public/Businesses',
      InterestInLand: null,
      SpecifyOther: null,
      CompulsoryAcquisitionHearing: null,
      RepresentationOriginal: null,
      RepresentationRedacted: 'Some comments',
      RelevantOrNot: null,
      SubmitFurtherWrittenReps: null,
      PreliminaryMeeting: null,
      OpenFloorHearings: null,
      IssuesSpecificHearings: null,
      DateRrepReceived: '2020-02-19T00:00:00.000Z',
      DoNotPublish: null,
      Attachments: 'WS010006-000002',
    },
  ];

  const paginationData = {
    totalItems: 1,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  };

  const pageOptions = ['1'];

  searchRepresentations.mockImplementation(() =>
    Promise.resolve({
      resp_code: 200,
      data: {
        representations,
        totalItems: 1,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    })
  );

  it('should getRepresentations and return the correct template', async () => {
    await controller.getRepresentations(req, res);
    expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.REPRESENTATIONS, {
      projectName: 'ABC',
      caseRef: 'ABCD1234',
      representations,
      paginationData,
      pageOptions,
    });
  });

});
