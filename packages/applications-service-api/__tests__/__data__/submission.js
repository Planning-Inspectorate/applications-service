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

module.exports = {
	SUBMISSION_CREATE_REQUEST
};
