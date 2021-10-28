const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const cookieRouter = require('./cookies');
const overviewRouter = require('./overview');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');
const interestedPartyRouter = require('./interested-party-guide');

router.use('/', homeRouter);
router.use(guidancePagesRouter);
router.use('/cookies', cookieRouter);
router.use('/overview', overviewRouter);
router.use('/register', registerRouter);
router.use('/interested-party-guide', interestedPartyRouter);

module.exports = router;
