const express = require('express');
const { getShortDocLinkURL } = require('./index/_utils/get-short-doc-link-url');
const { getDocumentShortLinkController } = require('./index/controller');

const shortDocLinkURL = getShortDocLinkURL();

const shortDocLinkRedirectRouter = express.Router();

shortDocLinkRedirectRouter.get(shortDocLinkURL, getDocumentShortLinkController);

module.exports = { shortDocLinkRedirectRouter };
