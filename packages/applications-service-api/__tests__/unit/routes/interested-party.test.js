const { get, post } = require('./router-mock');
const interestedPartyController = require('../../../src/controllers/interested-party');

describe('routes/interested-party', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/interested-party');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/:caseRef', interestedPartyController.getInterestedParty);
    expect(post).toHaveBeenCalledWith('/', interestedPartyController.createInterestedParty);
  });
});
