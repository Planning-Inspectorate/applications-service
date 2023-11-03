const express = require('express');
const { getIndex } = require('./controller');

const indexRouter = express.Router();

indexRouter.get('/', getIndex);

module.exports = {
	indexRouter
};
