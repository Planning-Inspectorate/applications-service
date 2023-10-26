const express = require('express');
const {
	getHavingYourSayPreApp,
	getRegisteringToHaveYourSay,
	getInvolvedInPreliminaryMeeting,
	getHavingYourSayExamination,
	getWhatYouCanDoAfterDecision
} = require('../controllers/having-your-say-guide');

const router = express.Router();

router.get('/having-your-say-guide/taking-part-pre-application', getHavingYourSayPreApp);
router.get('/having-your-say-guide/registering-have-your-say', getRegisteringToHaveYourSay);
router.get(
	'/having-your-say-guide/get-involved-preliminary-meeting',
	getInvolvedInPreliminaryMeeting
);
router.get('/having-your-say-guide/have-your-say-examination', getHavingYourSayExamination);
router.get('/having-your-say-guide/what-happens-after-decision', getWhatYouCanDoAfterDecision);

module.exports = router;
