const { VIEW } = require('../../../src/lib/views');

describe('lib/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({

      APPLICATION_NUMBER: 'application-number',
      DOCUMENT_LIBRARY: 'document-library',
      COOKIES: 'cookies',
    
      GUIDANCE_PAGES: {
        BEFORE_APPLY: 'guidance-pages/before-apply',
      },
      MESSAGES: {
        COOKIES_UPDATED_SUCCESSFULLY: 'messages/cookies-updated-successfully',
      },
      OVERVIEW: 'overview',
      PROJECT_SEARCH: "project-search",
      REGISTER: {
        START: 'register/start',
        TYPE_OF_PARTY: 'register/type-of-party',
        MYSELF : {
          FULL_NAME: 'register/myself/full-name',
          ADDRESS: 'register/myself/address',
          CHECK_YOUR_ANSWERS: 'register/myself/check-your-answers',
          COMMENTS: 'register/myself/comments',
          CONFIRMATION: 'register/myself/confirmation',
          DECLARATION: 'register/myself/declaration',
          EMAIL: 'register/myself/email',
          FULL_NAME: 'register/myself/full-name',
          OVER_18: 'register/myself/over-18',
          TELEPHONE:'register/myself/telephone',
        },
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
