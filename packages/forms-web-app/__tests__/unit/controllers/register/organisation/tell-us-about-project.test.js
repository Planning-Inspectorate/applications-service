const commentsController = require('../../../../../src/controllers/register/organisation/tell-us-about-project');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/tell-us-about-project', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      query: {},
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getComments', () => {
    it('should call the correct template', () => {
      commentsController.getComments(req, res);
      expect(res.render).toHaveBeenCalledWith('register/organisation/tell-us-about-project', {
        comment: undefined,
      });
    });

    it('should call the correct template in edit mode', () => {
      req = {
        ...mockReq(),
        query: {
          mode: 'edit',
          index: 0,
        },
        session: {
          comment: 'test',
        },
      };
      commentsController.getComments(req, res);
      expect(res.render).toHaveBeenCalledWith('register/organisation/tell-us-about-project', {
        comment: 'test',
      });
    });
  });

  describe('postComments', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}' if comments is provided and mode is edit`, async () => {
      const mockRequest = {
        ...req,
        body: {
          comment: 'test',
        },
        query: {
          mode: 'edit',
        },
      };
      await commentsController.postComments(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(
        `/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`
      );
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await commentsController.postComments(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT, {
        errors: { a: 'b' },
        errorSummary: [{ href: '#', text: 'There were errors here' }],
        comment: undefined,
      });
    });
  });
});
