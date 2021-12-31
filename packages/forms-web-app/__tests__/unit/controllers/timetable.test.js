const controller = require('../../../src/controllers/timetable');
const { getProjectData } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/timetable', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getTimetable', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: {
            ProjectName: 'St James Barton Giant Wind Turbine',
            CaseReference: 'EN010009',
          },
        })
      );
      await controller.getTimetable(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.TIMETABLE, {
        projectName: 'St James Barton Giant Wind Turbine',
        caseRef: 'EN010009',
      });
    });
  });
});
