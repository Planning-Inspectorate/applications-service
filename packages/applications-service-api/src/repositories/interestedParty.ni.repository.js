const db = require('../models');

const createInterestedParty = async (data) => {
	const result = await db.InterestedParty.create(data);
	return result.dataValues;
};

const updateInterestedParty = async (id, data) =>
	await db.InterestedParty.update(data, { where: { ID: id } });

module.exports = { createInterestedParty, updateInterestedParty };
