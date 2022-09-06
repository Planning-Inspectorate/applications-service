const logger = require('../lib/logger');
const config = require('../lib/config');

const { getTimetables } = require('../services/timetable.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getTimetables(req, res) {
		const { caseRef } = req.params;

		logger.debug(`Retrieving timetables by case reference ${caseRef} ...`);
		try {
			const timetables = await getTimetables(caseRef);

			if (!timetables.rows.length) {
				throw ApiError.noDocumentsFound();
			}

			const rows = timetables.rows.map((row) => mapTimetableRow(row.dataValues));

			logger.debug(`Documents for project ${caseRef} retrieved`);

			res.status(200).send({
				timetables: rows,
				totalItems: rows.length,
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

const mapTimetableRow = (row) => ({
	id: row.id,
	uniqueId: row.unique_id,
	caseReference: row.case_reference,
	title: row.title,
	description: row.description,
	dateOfEvent: row.date_of_event,
	timetableType: row.timetable_type,
	typeOfEvent: row.type_of_event,
	location: row.location,
	dateCreated: row.date_created,
	dateLastModified: row.date_last_modified,
	dateTimeDeadlineStart: row.dateTimeDeadlineStart,
	sourceSystem: row.sourceSystem
});
