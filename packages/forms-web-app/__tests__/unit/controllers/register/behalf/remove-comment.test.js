const removeCommentController = require('../../../../../src/controllers/register/behalf/remove-comment');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/behalf/remove-comment', () => {
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

  describe('getRemoveComment', () => {
    req = {
      ...mockReq(),
      query: {
        index: 0,
      },
      session: {
        comments: [
          {
            topic: 'topic',
            comment: 'test',
          },
        ],
      },
    };
    it('should call the correct template', () => {
      req = {
        ...mockReq(),
        query: {
          mode: 'edit',
          index: 0,
        },
        session: {
          comments: [
            {
              topic: 'topic',
              comment: 'test',
            },
          ],
        },
      };
      removeCommentController.getRemoveComment(req, res);
      expect(res.render).toHaveBeenCalledWith('register/behalf/remove-comment', {
        comment: {
          topic: 'topic',
          comment: 'test',
        },
        index: 0,
      });
    });
  });

  describe('postRemoveComment', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT}' if remove comment is yes and src is add`, async () => {
      const mockRequest = {
        ...req,
        body: {
          'remove-comment': 'yes',
        },
        query: {
          src: 'add',
        },
        session: {
          comments: [
            {
              topic: 'topic',
              comment: 'test',
            },
          ],
        },
      };
      await removeCommentController.postRemoveComment(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT}`);
    });

    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}' if remove comment is yes and src is check`, async () => {
      const mockRequest = {
        ...req,
        body: {
          'remove-comment': 'yes',
        },
        query: {
          src: 'check',
        },
        session: {
          comments: [
            {
              topic: 'topic',
              comment: 'test',
            },
          ],
        },
      };
      await removeCommentController.postRemoveComment(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
    });

    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await removeCommentController.postRemoveComment(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.BEHALF.REMOVE_COMMENT, {
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
