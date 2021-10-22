const { VIEW } = require('../../../src/lib/views');

describe('lib/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({

      APPLICATION_NUMBER: 'application-number',

      COOKIES: 'cookies',
    
      GUIDANCE_PAGES: {
        BEFORE_APPLY: 'guidance-pages/before-apply',
      },
      MESSAGES: {
        COOKIES_UPDATED_SUCCESSFULLY: 'messages/cookies-updated-successfully',
      },
    
      REGISTER: {
        TYPE_OF_PARTY: 'register/type-of-party',
        FULL_NAME: 'register/full-name',
        TEST2: 'register/test2',
        TEST3: 'register/test3',
      }
    });
  });
});
