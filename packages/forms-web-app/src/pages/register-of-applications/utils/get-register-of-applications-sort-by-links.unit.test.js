const {
	getRegisterOfApplicationsSortByLinks
} = require('./get-register-of-applications-sort-by-links');

describe('register-of-applications/utils/get-register-of-applications-sort-by-links', () => {
	describe('#getRegisterOfApplicationsSortByLinks', () => {
		describe('When getting the register of applications sort by links', () => {
			describe('and there are no query parameters', () => {
				let registerOfApplicationsSortByLinks;

				beforeEach(() => {
					registerOfApplicationsSortByLinks = getRegisterOfApplicationsSortByLinks({});
				});

				it('should return the default register of applications sort by links', () => {
					expect(registerOfApplicationsSortByLinks).toEqual([
						{ link: '?sortBy=%2BProjectName&page=1', name: 'Project name', sort: 'none' },
						{ name: 'Location' },
						{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
						{
							link: '?sortBy=%2BDateOfDCOSubmission&page=1',
							name: 'Date of application',
							sort: 'none'
						},
						{
							link: '?sortBy=%2BConfirmedDateOfDecision&page=1',
							name: 'Date of decision',
							sort: 'none'
						},
						{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
					]);
				});
			});

			describe('and there are query parameters', () => {
				let registerOfApplicationsSortByLinks;

				beforeEach(() => {
					registerOfApplicationsSortByLinks = getRegisterOfApplicationsSortByLinks({
						sortBy: '+ProjectName'
					});
				});

				it('should return the register of applications sort by links with project name sorted by ascending', () => {
					expect(registerOfApplicationsSortByLinks).toEqual([
						{ link: '?sortBy=-ProjectName&page=1', name: 'Project name', sort: 'ascending' },
						{ name: 'Location' },
						{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
						{
							link: '?sortBy=%2BDateOfDCOSubmission&page=1',
							name: 'Date of application',
							sort: 'none'
						},
						{
							link: '?sortBy=%2BConfirmedDateOfDecision&page=1',
							name: 'Date of decision',
							sort: 'none'
						},
						{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
					]);
				});
			});
		});
	});
});
