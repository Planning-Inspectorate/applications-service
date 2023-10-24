const express = require('express');

const { getHaveYourSayGuideController } = require('./index/controller');

const { haveYourSayGuideURL } = require('./index/config');

const haveYourSayGuideRouter = express.Router();

haveYourSayGuideRouter.get(haveYourSayGuideURL, getHaveYourSayGuideController);

module.exports = { haveYourSayGuideRouter };
