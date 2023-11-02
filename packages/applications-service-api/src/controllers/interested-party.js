const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const IPFactory = require('../factories/interested-party/factory');

const {
	createInterestedParty: createInterestedPartyService
} = require('../services/interestedParty.ni.service');

module.exports = {
	async createInterestedParty(req, res) {
		const { behalf } = req.body;
		const interestedPartyData = IPFactory.createIP(behalf).get(req.body);

		const interestedParty = await createInterestedPartyService(interestedPartyData);

		logger.debug(`InterestedParty ${interestedParty.ID} created`);

		res.status(StatusCodes.CREATED).send({ referenceId: interestedParty.ID });
	}
};
