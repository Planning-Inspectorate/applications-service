const config = require('../lib/config');
const db = require('../models');

const getTimetables = async (caseRef) => {
	return db.Timetable.findAndCountAll({
		where: {
			case_reference: caseRef
		},
		limit: config.timetableItemsPerPage
	});
};

module.exports = {
	getTimetables
};
