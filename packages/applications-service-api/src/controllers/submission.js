const Path = require('path');

module.exports = {
	async createSubmission(req, res) {
		const { caseRef } = req.params;

		// return mocked response for now
		res.status(200).send({
			name: req.body.name,
			email: req.body.email,
			interestedParty: parseBoolean(req.body.interestedParty),
			ipReference: req.body.ipReference,
			deadline: req.body.deadline,
			submissionType: req.body.submissionType,
			sensitiveData: parseBoolean(req.body.sensitiveData),
			lateSubmission: parseBoolean(req.body.lateSubmission),
			submissionId: req.body.submissionId,
			representation: req.body.representation,
			file: {
				name: buildFileName(req.file.originalname, caseRef),
				originalName: req.file.originalname,
				size: req.file.size,
				md5: 'dummymd5'
			},
			caseReference: caseRef,
			dateSubmitted: new Date()
		});
	}
};

const buildFileName = (fileName, caseReference) => {
	const parsedName = Path.parse(fileName);
	return `${parsedName.name}-${caseReference}${parsedName.ext}`;
};

const parseBoolean = (str) => {
	try {
		return typeof str === 'string' ? JSON.parse(str.toLowerCase()) : null;
	} catch {
		return null;
	}
};
