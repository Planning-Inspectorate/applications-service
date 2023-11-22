const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');

const { createInterestedParty } = require('../services/interestedParty.service');
const { pick } = require('lodash');

module.exports = {
	async createInterestedParty(req, res) {
		const createInterestedPartyRequest = pick(req.body, [
			'case_ref',
			'behalf',
			'full-name',
			'over-18',
			'address',
			'email',
			'telephone',
			'comment',
			'organisation-name',
			'role',
			'representing',
			'representee',
			'representor'
		]);

		const interestedPartyDetails = await createInterestedParty(createInterestedPartyRequest);

		logger.debug(`Interested Party ${interestedPartyDetails.referenceId} created`);

		res.status(StatusCodes.CREATED).send({ referenceId: interestedPartyDetails.referenceId });
	}
};
