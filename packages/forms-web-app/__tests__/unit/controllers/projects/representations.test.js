const controller = require('../../../../src/controllers/projects/representations');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/representations', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      session: {
        caseRef: 'ABCD1234',
        projectName: 'ABC',
      },
    };
    res = mockRes();
  });

  describe('getRepresentations', () => {
    it('should call the correct template', async () => {
      await controller.getRepresentations(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.REPRESENTATIONS, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
