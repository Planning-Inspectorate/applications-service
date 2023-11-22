const db = require('../models');
const ApiError = require('../error/apiError');

const createInterestedParty = async (data) => {
	try {
		const result = await db.InterestedParty.create(data);
		return result.dataValues;
	} catch (e) {
		if (
			e.name === 'SequelizeDatabaseError' &&
			e.parent.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
		) {
			throw ApiError.badRequest(e.message);
		} else {
			throw e;
		}
	}
};

const updateInterestedParty = async (id, data) =>
	await db.InterestedParty.update(data, { where: { ID: id } });

module.exports = { createInterestedParty, updateInterestedParty };
