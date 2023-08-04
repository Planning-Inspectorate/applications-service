const getProjectUpdatesSuccessfulFixture = {
	resp_code: 200,
	data: {
		updates: [
			{
				updateDate: '2021-01-01',
				updateName: 'mock update name 1',
				updateContentEnglish: 'mock english content update 1',
				updateContentWelsh: 'mock welsh content update 1'
			},
			{
				updateDate: '2022-02-02',
				updateName: 'mock update name 2',
				updateContentEnglish: 'mock english content update 2',
				updateContentWelsh: 'mock welsh content update 2'
			}
		]
	}
};

const getProjectUpdatesSuccessfulNoUpdatesFixture = {
	resp_code: 200,
	data: {
		updates: []
	}
};

const getProjectUpdatesUnsuccessfulFixture = {
	resp_code: 404
};

module.exports = {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
};
