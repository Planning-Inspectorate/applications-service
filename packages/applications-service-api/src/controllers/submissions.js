const Path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = {
	async createSubmission(req, res) {
		const { caseRef } = req.params;

		const submissionId = parseInteger(req.body.submissionId) || Math.floor(Math.random() * 100);
		const sequenceNumber = 1;

		const responseBody = {
			name: req.body.name,
			email: req.body.email,
			interestedParty: parseBoolean(req.body.interestedParty),
			ipReference: req.body.ipReference,
			deadline: req.body.deadline,
			submissionType: req.body.submissionType,
			sensitiveData: parseBoolean(req.body.sensitiveData),
			lateSubmission: parseBoolean(req.body.lateSubmission),
			submissionId: submissionId,
			caseReference: caseRef,
			dateSubmitted: new Date()
		};

		if (req.body.representation) {
			responseBody.representation = req.body.representation;
		} else if (req.file) {
			responseBody.file = {
				name: buildFileName(req.file.originalname, submissionId, sequenceNumber),
				originalName: req.file.originalname,
				size: req.file.size,
				md5: 'dummymd5'
			};
		} else {
			return res.status(StatusCodes.BAD_REQUEST).send({
				code: StatusCodes.BAD_REQUEST,
				errors: ["Missing property 'representation' or 'file'"]
			});
		}

		return res.status(StatusCodes.CREATED).send(responseBody);
	}
};

const buildFileName = (fileName, submissionId, sequenceNumber) => {
	const parsedName = Path.parse(fileName);
	return `${parsedName.name}-${submissionId}-${sequenceNumber}${parsedName.ext}`;
};

const parseBoolean = (str) => {
	try {
		return typeof str === 'string' ? JSON.parse(str.toLowerCase()) : null;
	} catch {
		return null;
	}
};

const parseInteger = (str) => {
	const i = parseInt(str);
	return isNaN(i) ? null : i;
};
