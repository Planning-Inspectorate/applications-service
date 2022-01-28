const express = require('express');
const {
  getHavingYourSayAboutProject,
  getHavingYourSayPreApp,
  getRegisteringToHaveYourSay,
  getInvolvedInPreliminaryMeeting,
  getHavingYourSayExamination,
  getWhatYouCanDoAfterDecision,
} = require('../controllers/having-your-say-guide');

const router = express.Router();
router.get('/having-your-say-guide', getHavingYourSayAboutProject);
router.get('/having-your-say-guide/index', getHavingYourSayAboutProject);
router.get('/having-your-say-guide/taking-part-pre-application', getHavingYourSayPreApp);
router.get('/having-your-say-guide/registering-have-your-say', getRegisteringToHaveYourSay);
router.get(
  '/having-your-say-guide/get-involved-preliminary-meetings',
  getInvolvedInPreliminaryMeeting
);
router.get(
  '/having-your-say-guide/have-say-during-project-examination',
  getHavingYourSayExamination
);
router.get('/having-your-say-guide/after-making-the-decision', getWhatYouCanDoAfterDecision);

module.exports = router;
