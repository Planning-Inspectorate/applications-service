const express = require('express');

const registerMyselfRouter = express.Router({ mergeParams: true });

module.exports = { registerMyselfRouter };
