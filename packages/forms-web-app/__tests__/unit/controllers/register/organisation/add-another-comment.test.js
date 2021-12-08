const addAnotherCommentController = require('../../../../../src/controllers/register/organisation/add-another-comment');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/add-another-comment', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            ...mockReq(),
        };
        res = mockRes();
        jest.resetAllMocks();
    });

    describe('getAnotherComment', () => {
        it('should call the correct template', () => {
            addAnotherCommentController.getAnotherComment(req, res);
            expect(res.render).toHaveBeenCalledWith('register/organisation/add-another-comment', {"comments": undefined});
        });
    });

    describe('postAnotherComment', () => {
        it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.COMMENTS}' if add-another-comment is provided as yes`, async () => {
            const mockRequest = {
                ...req,
                body: {
                    'add-another-comment': 'yes',
                }
            };
            await addAnotherCommentController.postAnotherComment(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.COMMENTS}`);
        });
        it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}' if add-another-comment is provided as no`, async () => {
            const mockRequest = {
                ...req,
                body: {
                    'add-another-comment': 'no',
                }
            };
            await addAnotherCommentController.postAnotherComment(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
        });
        it('should re-render the template with errors if there is any validation error', async () => {
            const mockRequest = {
                ...req,
                body: {
                    errorSummary: [{ text: 'There were errors here', href: '#' }],
                    errors: { a: 'b' }
                },
            };
            await addAnotherCommentController.postAnotherComment(
                mockRequest,
                res
            );
            expect(res.redirect).not.toHaveBeenCalled();

            expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.ADD_ANOTHER_COMMENT, {
                errorSummary: [{ text: 'There were errors here', href: '#' }],
                errors: { a: 'b' }
            });
        });
    });
});