const express = require('express');
const { getShortDocLinkPath } = require('./index/_utils/get-short-doc-link-path');
const { getDocumentShortLinkController } = require('./index/controller');

const shortDocLinkPath = getShortDocLinkPath();

const shortDocLinkRedirectRouter = express.Router();

shortDocLinkRedirectRouter.get(shortDocLinkPath, getDocumentShortLinkController);

module.exports = { shortDocLinkRedirectRouter };
