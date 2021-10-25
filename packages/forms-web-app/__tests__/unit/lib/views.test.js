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
      },
      
      INTERESTED_PARTY_GUIDE: {
        INTERESTED_PARTY: 'interested-party-guide/interested-party',
        HAVE_SAY_PRE_APPLICATION: 'interested-party-guide/have-say-pre-application',
        REGISTER_TO_HAVE_YOUR_SAY: 'interested-party-guide/register-to-have-your-say',
        GET_INVOLVED_PRELIMINARY_MEETINGS: 'interested-party-guide/get-involved-preliminary-meetings',
        HAVE_SAY_DURING_PROJECT_EXAMINATION: 'interested-party-guide/have-say-during-project-examination',
        AFTER_MAKING_THE_DECISION: 'interested-party-guide/after-making-the-decision',
      },
    });
  });
});
