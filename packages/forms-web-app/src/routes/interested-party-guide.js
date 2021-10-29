const express = require('express');
const {
  getHavingYourSayAboutProject,
  getHavingYourSayPreApp,
  getRegisteringToHaveYourSay,
  getInvolvedInPreliminaryMeeting,
  getHavingYourSayExamination,
  getWhatYouCanDoAfterDecision,
} = require('../controllers/interested-party-guide');

const router = express.Router();
router.get('/interested-party-guide', getHavingYourSayAboutProject);
router.get('/interested-party-guide/index', getHavingYourSayAboutProject);
router.get('/interested-party-guide/have-say-pre-application', getHavingYourSayPreApp);
router.get('/interested-party-guide/register-to-have-your-say', getRegisteringToHaveYourSay);
router.get('/interested-party-guide/get-involved-preliminary-meetings', getInvolvedInPreliminaryMeeting);
router.get('/interested-party-guide/have-say-during-project-examination', getHavingYourSayExamination);
router.get('/interested-party-guide/after-making-the-decision', getWhatYouCanDoAfterDecision);


module.exports = router;
