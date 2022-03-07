const { get, post } = require('../router-mock');

const aboutTheApplicationController = require('../../../../src/controllers/examination/about-the-application');
const examinationController = require('../../../../src/controllers/examination/examination');

describe('routes/examination/about-the-application', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/examination/about-the-application');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/:case_ref/about-the-application/:page',
      aboutTheApplicationController.getAboutTheApplication
    );
    expect(post).toHaveBeenCalledWith(
      '/:case_ref/about-the-application/search/:page',
      aboutTheApplicationController.postSearchDocument
    );
    expect(post).toHaveBeenCalledWith(
      '/:case_ref/about-the-application/filter/:page',
      aboutTheApplicationController.postFilterDocument
    );
    expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
    expect(post.mock.calls.length).toBe(2);
    expect(get.mock.calls.length).toBe(2);
  });
});
