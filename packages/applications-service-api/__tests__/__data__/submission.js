const SUBMISSION_CREATE_REQUEST = {
	headers: {
		'content-type':
			'multipart/form-data; boundary=--------------------------002628336047044988377296',
		'content-length': '1010'
	},
	body: {},
	params: {
		caseReference: 'EN010009'
	},
	query: {},
	baseUrl: '/api/v1/submissions',
	route: {
		path: '/:caseReference'
	},
	method: 'POST'
};

const SUBMISSION_DATA = {
	metadata: {
		name: 'Joe Bloggs',
		email: 'joe@example.org',
		interestedParty: true,
		ipReference: '999999999',
		deadline: 'Deadline 1',
		submissionType: 'Some Type',
		sensitiveData: undefined,
		lateSubmission: undefined,
		caseReference: 'EN010120',
		dateSubmitted: '2023-10-01 12:33:14',
		submissionId: 123,
		representation: 'the rep'
	}
};

// Submission as passed to db create
const SUBMISSION_DB_CREATE_INPUT = {
	name: 'Joe Bloggs',
	email: 'joe@example.org',
	interestedParty: true,
	iPReference: '999999999',
	deadline: 'Deadline 1',
	submissionType: 'Some Type',
	sensitiveData: undefined,
	lateSubmission: undefined,
	caseReference: 'EN010120',
	dateSubmitted: '2023-10-01 12:33:14',
	submissionId: 123,
	representation: 'the rep'
};

// Submission as returned by db create
const SUBMISSION_DB_CREATE_OUTPUT = {
	id: 123,
	...SUBMISSION_DB_CREATE_INPUT
};

module.exports = {
	SUBMISSION_CREATE_REQUEST,
	SUBMISSION_DATA,
	SUBMISSION_DB_CREATE_INPUT,
	SUBMISSION_DB_CREATE_OUTPUT
};
