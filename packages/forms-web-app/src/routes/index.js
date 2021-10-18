const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const cookieRouter = require('./cookies');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');

router.use('/', homeRouter);
router.use(guidancePagesRouter);
router.use('/cookies', cookieRouter);
router.use('/register', registerRouter);

module.exports = router;
