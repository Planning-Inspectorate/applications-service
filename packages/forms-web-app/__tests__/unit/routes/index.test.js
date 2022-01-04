const { use } = require('./router-mock');
const registerRouter = require('../../../src/routes/register');
const homeRouter = require('../../../src/routes/home');
const cookieRouter = require('../../../src/routes/cookies');
const examinationRouter = require('../../../src/routes/examination');
const projectSearchRouter = require('../../../src/routes/project-search');
const interestedPartyRouter = require('../../../src/routes/interested-party-guide');
const footerPagesRouter = require('../../../src/routes/footer-pages');
const representationsRouter = require('../../../src/routes/representations');
const timetableRouter = require('../../../src/routes/timetable');
const allExaminationDocsRouter = require('../../../src/routes/all-examination-documents');
const recommendationsRouter = require('../../../src/routes/recommendations');

describe('routes/index', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(use).toHaveBeenCalledWith('/', homeRouter);
    expect(use).toHaveBeenCalledWith('/cookies', cookieRouter);
    expect(use).toHaveBeenCalledWith('/register', registerRouter);
    expect(use).toHaveBeenCalledWith('/examination', examinationRouter);
    expect(use).toHaveBeenCalledWith('/project-search', projectSearchRouter);
    expect(use).toHaveBeenCalledWith(interestedPartyRouter);
    expect(use).toHaveBeenCalledWith('/', footerPagesRouter);
    expect(use).toHaveBeenCalledWith('/', representationsRouter);
    expect(use).toHaveBeenCalledWith('/', timetableRouter);
    expect(use).toHaveBeenCalledWith('/', allExaminationDocsRouter);
    expect(use).toHaveBeenCalledWith('/', recommendationsRouter);
    expect(use.mock.calls.length).toBe(13);
  });
});
