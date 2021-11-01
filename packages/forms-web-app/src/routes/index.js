const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const cookieRouter = require('./cookies');
const overviewRouter = require('./overview');
const projectSearchRouter = require('./project-search');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');
const interestedPartyRouter = require('./interested-party-guide');

router.use('/', homeRouter);
router.use('/', guidancePagesRouter);
router.use('/cookies', cookieRouter);
router.use('/overview', overviewRouter);
router.use('/project-search', projectSearchRouter);
router.use('/register', registerRouter);
router.use(interestedPartyRouter);

module.exports = router;
