const express = require('express');

const router = express.Router();

const interestedPartyGuideRouter = require('./interested-party');
const haveSayPreApplicationRouter = require('./have-say-pre-application');
const registerToHaveYourSayRouter = require('./register-to-have-your-say');
const getInvolvedPreliminaryMeetingsRouter = require('./get-involved-preliminary-meetings');
const haveSayDuringProjectExaminationRouter = require('./have-say-during-project-examination');
const afterMakingTheDecisionRouter = require('./after-making-the-decision');

router.use('/', interestedPartyGuideRouter);
router.use('/', haveSayPreApplicationRouter);
router.use('/', registerToHaveYourSayRouter);
router.use('/', getInvolvedPreliminaryMeetingsRouter);
router.use('/', haveSayDuringProjectExaminationRouter);
router.use('/', afterMakingTheDecisionRouter);

module.exports = router;
