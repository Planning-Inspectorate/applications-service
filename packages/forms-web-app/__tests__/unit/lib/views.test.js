const { VIEW } = require('../../../src/lib/views');

describe('lib/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({
      APPLICATION_NUMBER: 'application-number',

      COOKIES: 'cookies',
      EXAMINATION: {
        EXAMINATION: 'examination/examination',
        PROJECT_TIMELINE: 'examination/project-timeline',
        ABOUT_THE_APPLICATION: 'examination/about-the-application',
        REPRESENTATIONS: 'examination/representations',
        TIMETABLE: 'examination/timetable',
        ALL_EXAMINATION_DOCUMENTS: 'examination/all-examination-documents',
        RECOMMENDATIONS: 'examination/recommendations',
      },

      PROJECT_SEARCH: 'project-search',
      GUIDANCE_PAGES: {
        BEFORE_APPLY: 'guidance-pages/before-apply',
      },
      MESSAGES: {
        COOKIES_UPDATED_SUCCESSFULLY: 'messages/cookies-updated-successfully',
      },
      REGISTER: {
        SAVE_CONFIRMATION: 'register/save-confirmation',
        START: 'register/start',
        TOKEN_EXPIRED: 'register/token-expired',
        TOKEN_NOT_VERIFIED: 'register/not-verified',
        TYPE_OF_PARTY: 'register/type-of-party',
        CONFIRM_EMAIL: 'register/confirm-email',
        MYSELF: {
          FULL_NAME: 'register/myself/full-name',
          OVER_18: 'register/myself/over-18',
          ADDRESS: 'register/myself/address',
          EMAIL: 'register/myself/email',
          TELEPHONE: 'register/myself/telephone',
          COMMENTS: 'register/myself/comments',
          REMOVE_COMMENT: 'register/myself/remove-comment',
          CHECK_YOUR_ANSWERS: 'register/myself/check-your-answers',
          DECLARATION: 'register/myself/declaration',
          CONFIRMATION: 'register/myself/confirmation',
        },
        ORGANISATION: {
          FULL_NAME: 'register/organisation/full-name',
          OVER_18: 'register/organisation/over-18',
          ORGANISATION_NAME: 'register/organisation/organisation-name',
          ROLE: 'register/organisation/role',
          ADDRESS: 'register/organisation/address',
          EMAIL: 'register/organisation/email',
          TELEPHONE: 'register/organisation/telephone',
          COMMENTS: 'register/organisation/comments',
          REMOVE_COMMENT: 'register/organisation/remove-comment',
          CHECK_YOUR_ANSWERS: 'register/organisation/check-your-answers',
          DECLARATION: 'register/organisation/declaration',
          CONFIRMATION: 'register/organisation/confirmation',
        },
        BEHALF: {
          REPRESENTING_FOR: 'register/behalf/representing-for',
          REPRESENTEE_NAME: 'register/behalf/representee-name',
          REPRESENTEE_OVER_18: 'register/behalf/representee-over-18',
          REPRESENTEE_ADDRESS: 'register/behalf/representee-address',
          REPRESENTEE_EMAIL: 'register/behalf/representee-email',
          REPRESENTEE_TELEPHONE: 'register/behalf/representee-telephone',
          FULL_NAME: 'register/behalf/full-name',
          ADDRESS: 'register/behalf/address',
          EMAIL: 'register/behalf/email',
          TELEPHONE: 'register/behalf/telephone',
          ORGANISATION_NAME: 'register/behalf/organisation-name',
          COMMENTS: 'register/behalf/comments',
          ADD_ANOTHER_COMMENT: 'register/behalf/add-another-comment',
          REMOVE_COMMENT: 'register/behalf/remove-comment',
          CHECK_YOUR_ANSWERS: 'register/behalf/check-your-answers',
          DECLARATION: 'register/behalf/declaration',
          CONFIRMATION: 'register/behalf/confirmation',
        },
      },

      INTERESTED_PARTY_GUIDE: {
        INTERESTED_PARTY: 'interested-party-guide/interested-party',
        HAVE_SAY_PRE_APPLICATION: 'interested-party-guide/have-say-pre-application',
        REGISTER_TO_HAVE_YOUR_SAY: 'interested-party-guide/register-to-have-your-say',
        GET_INVOLVED_PRELIMINARY_MEETINGS:
          'interested-party-guide/get-involved-preliminary-meetings',
        HAVE_SAY_DURING_PROJECT_EXAMINATION:
          'interested-party-guide/have-say-during-project-examination',
        AFTER_MAKING_THE_DECISION: 'interested-party-guide/after-making-the-decision',
      },
      FOOTER_PAGES: {
        TERMS_AND_CONDITIONS: 'footer-pages/terms-and-conditions',
        SITEMAP: 'footer-pages/sitemap',
        ACCESSIBILITY: 'footer-pages/accessibility',
        COOKIES: 'footer-pages/cookies-info',
      },
    });
  });
});
