const express = require('express');
const { getDetailedInformationController } = require('./controller');
const { getDetailedInformationURL } = require('./_utils/get-detailed-information-url');

const detailedInformationRouter = express.Router();
const detailedInformationURL = getDetailedInformationURL();

detailedInformationRouter.get(detailedInformationURL, getDetailedInformationController);

module.exports = {
	detailedInformationRouter
};
