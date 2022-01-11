const controller = require('../../../../src/controllers/examination/timetable');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/examination/timetable', () => {
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

  describe('getTimetable', () => {
    it('should call the correct template', async () => {
      await controller.getTimetable(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.TIMETABLE, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
