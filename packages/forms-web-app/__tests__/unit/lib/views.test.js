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
        TYPE_OF_PARTY: 'register/who-registering-for',
        CONFIRM_EMAIL: 'register/confirm-email',
        MYSELF: {
          FULL_NAME: 'register/myself/full-name',
          OVER_18: 'register/myself/are-you-18-over',
          ADDRESS: 'register/myself/address',
          EMAIL_ADDRESS: 'register/myself/email-address',
          TELEPHONE: 'register/myself/telephone',
          TELL_US_ABOUT_PROJECT: 'register/myself/tell-us-about-project',
          CHECK_YOUR_ANSWERS: 'register/myself/check-answers',
          DECLARATION: 'register/myself/declaration',
          REGISTRATION_COMPLETE: 'register/myself/registration-complete',
        },
        ORGANISATION: {
          FULL_NAME: 'register/organisation/full-name',
          OVER_18: 'register/organisation/over-18',
          ORGANISATION_NAME: 'register/organisation/organisation-name',
          ROLE: 'register/organisation/role',
          ADDRESS: 'register/organisation/address',
          EMAIL: 'register/organisation/email',
          TELEPHONE: 'register/organisation/telephone',
          TELL_US_ABOUT_PROJECT: 'register/organisation/tell-us-about-project',
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
          ORGANISATION_NAME: 'register/agent/name-of-organisation',
          TELL_US_ABOUT_PROJECT: 'register/behalf/tell-us-about-project',
          CHECK_YOUR_ANSWERS: 'register/behalf/check-your-answers',
          DECLARATION: 'register/behalf/declaration',
          CONFIRMATION: 'register/behalf/confirmation',
        },
      },
      INTERESTED_PARTY_GUIDE: {
        INTERESTED_PARTY: 'having-your-say-guide/interested-party',
        HAVE_SAY_PRE_APPLICATION: 'having-your-say-guide/taking-part-pre-application',
        REGISTER_TO_HAVE_YOUR_SAY: 'having-your-say-guide/registering-have-your-say',
        GET_INVOLVED_PRELIMINARY_MEETING: 'having-your-say-guide/get-involved-preliminary-meeting',
        HAVE_SAY_DURING_PROJECT_EXAMINATION: 'having-your-say-guide/have-your-say-examination',
        AFTER_MAKING_THE_DECISION: 'having-your-say-guide/what-happens-after-decision',
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
