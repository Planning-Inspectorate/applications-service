const express = require('express');
const { getHaveYourSay } = require('./have-your-say.controller');
const router = express.Router();

router.get('/have-your-say-during-examination', getHaveYourSay);

module.exports = { haveYourSayRouter: router };
