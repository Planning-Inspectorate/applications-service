const express = require('express');
const { getShortDocLinkURL } = require('./index/_utils/get-short-doc-link-url');
const { getDocumentShortLinkController } = require('./index/controller');

const shortDocLinkURL = getShortDocLinkURL();

const redirectRouter = express.Router();

redirectRouter.get(shortDocLinkURL, getDocumentShortLinkController);

module.exports = { redirectRouter };
