const logger = require('../lib/logger');
const config = require('../lib/config');

const { getTimetables } = require('../services/timetable.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getTimetables(req, res) {
		const caseRef = encodeURIComponent(req.params.caseRef);

		try {
			logger.debug(`Retrieving timetables by case reference ${caseRef} ...`);

			if (caseRef !== req.query.caseRef) {
				throw ApiError.badRequest('Invalid caseReference');
			}

			const timetables = await getTimetables(caseRef);

			if (!timetables.length) {
				throw ApiError.noDocumentsFound();
			}

			logger.debug(`Documents for project ${caseRef} retrieved`);

			res.status(200).send({
				timetables: timetables,
				totalItems: timetables.length,
				itemsPerPage: config.timetableItemsPerPage,
				totalPages: 1,
				currentPage: 1
			});
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
				return;
			}
			logger.error(e.message);
			res.status(500).send(`Problem getting timetables for project ${caseRef} \n ${e}`);
		}
	}
};
