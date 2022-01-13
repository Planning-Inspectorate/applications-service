const commentsController = require('../../../../../src/controllers/register/myself/comments');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/comments', () => {
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
      expect(res.render).toHaveBeenCalledWith('register/myself/comments', { comment: undefined });
    });

    it('should call the correct template in edit mode', () => {
      req = {
        ...mockReq(),
        query: {
          mode: 'edit',
          index: 0,
        },
        session: {
          comment: {
            comment: 'test',
          },
        },
      };
      commentsController.getComments(req, res);
      expect(res.render).toHaveBeenCalledWith('register/myself/comments', {
        comment: {
          comment: 'test',
        },
      });
    });
  });

  describe('postComments', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}' if comments is provided`, async () => {
      const mockRequest = {
        ...req,
        body: {
          comments: 'test',
        },
        query: {
          mode: '',
        },
      };
      await commentsController.postComments(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
    });
    it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}' if comments is provided and mode is edit`, async () => {
      const mockRequest = {
        ...req,
        body: {
          comments: 'test',
        },
        query: {
          mode: 'edit',
        },
        session: {
          comments: [],
        },
      };
      await commentsController.postComments(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
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

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.MYSELF.COMMENTS, {
        comment: {
          errorSummary: [
            {
              href: '#',
              text: 'There were errors here',
            },
          ],
          errors: {
            a: 'b',
          },
        },
        errorSummary: [
          {
            href: '#',
            text: 'There were errors here',
          },
        ],
        errors: {
          a: 'b',
        },
      });
    });
  });
});
