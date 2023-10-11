const db = require('../models');

const getSubmission = async (id) => db.Submission.findOne({ where: { id: id } });

const createSubmission = async (submissionData) => {
	const result = await db.Submission.create(submissionData);
	return result.dataValues;
};

const updateSubmission = async (id, submissionData) =>
	db.Submission.update(submissionData, {
		where: {
			id: id
		}
	});

module.exports = {
	getSubmission,
	createSubmission,
	updateSubmission
};
