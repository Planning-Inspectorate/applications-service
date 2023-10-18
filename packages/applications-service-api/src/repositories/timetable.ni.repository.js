const db = require('../models');
const config = require('../lib/config');

const getTimetablesByCaseReference = async (caseRef) =>
	db.Timetable.findAll({
		where: {
			case_reference: caseRef
		},
		limit: config.timetableItemsPerPage,
		order: [['date_of_event', 'ASC']],
		raw: true
	});

module.exports = {
	getTimetablesByCaseReference
};
