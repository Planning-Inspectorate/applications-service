const projectSearchController = require('../../../src/controllers/project-search');
const { getAllProjectList } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/project-search', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getProjectList', () => {
    it('should call the correct template', async () => {
      getAllProjectList.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: [
            {
              ProjectName: 'test',
              CaseReference: 'test',
              PromoterName: 'test',
              Stage: 1,
            },
          ],
        })
      );
      await projectSearchController.getProjectList(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.PROJECT_SEARCH, {
        appList: [
          {
            CaseReference: 'test',
            ProjectName: 'test',
            PromoterName: 'test',
            Stage: 'Pre Application',
          },
        ],
        noOfProjects: 1,
      });
    });
  });
});
