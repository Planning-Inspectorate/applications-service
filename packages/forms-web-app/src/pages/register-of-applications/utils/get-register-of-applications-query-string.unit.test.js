const {
	getRegisterOfApplicationsQueryString
} = require('./get-register-of-applications-query-string');

describe('register-of-applications/utils/get-register-of-applications-query-string', () => {
	describe('#getRegisterOfApplicationsQueryString', () => {
		describe('When getting the register of applications query string', () => {
			describe('and there are no query parameters', () => {
				let registerOfApplicationsQueryString;

				beforeEach(() => {
					registerOfApplicationsQueryString = getRegisterOfApplicationsQueryString({});
				});

				it('should return the default register of applications query string', () => {
					expect(registerOfApplicationsQueryString).toEqual(
						'?page=1&searchTerm=&size=25&sort=%2BDateOfDCOSubmission&stage=acceptance&stage=pre_examination&stage=examination&stage=recommendation&stage=decision&stage=post_decision&stage=withdrawn'
					);
				});
			});

			describe('and there are query parameters', () => {
				let registerOfApplicationsQueryString;

				beforeEach(() => {
					registerOfApplicationsQueryString = getRegisterOfApplicationsQueryString({
						page: 2,
						itemsPerPage: 50,
						sortBy: 'mock sort by'
					});
				});

				it('should return the default register of applications query string', () => {
					expect(registerOfApplicationsQueryString).toEqual(
						'?page=2&searchTerm=&size=50&sort=mock%20sort%20by&stage=acceptance&stage=pre_examination&stage=examination&stage=recommendation&stage=decision&stage=post_decision&stage=withdrawn'
					);
				});
			});
		});
	});
});
