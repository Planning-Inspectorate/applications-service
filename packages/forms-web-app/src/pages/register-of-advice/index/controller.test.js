const { getRegisterOfAdviceController } = require('./controller');

const { adviceFixture } = require('../../_fixtures/advice');

const { handler } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper', () => ({
	handler: jest.fn()
}));

describe('pages/register-of-advice/index/controller', () => {
	describe('#getRegisterOfAdviceController', () => {
		describe('When getting the register of advice page', () => {
			describe('and there is an issue', () => {
				const req = {
					query: {
						searchTerm: '',
						page: '',
						itemsPerPage: ''
					}
				};
				const res = { render: jest.fn() };
				const next = jest.fn();

				beforeEach(async () => {
					handler.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					await getRegisterOfAdviceController(req, res, next);
				});

				it('should throw an error', () => {
					expect(next).toHaveBeenCalledWith(new Error('something went wrong'));
				});
			});

			describe('and there are no issues', () => {
				describe('and the general advice is from the NI DB', () => {
					const req = {
						get: (value) => req[value],
						host: 'mock-host',
						protocol: 'mock-protocol',
						query: {
							searchTerm: '',
							page: '',
							itemsPerPage: ''
						}
					};
					const res = { render: jest.fn() };
					const next = jest.fn();

					beforeEach(async () => {
						handler.mockImplementation(() => adviceFixture.adviceNIFixture);
						await getRegisterOfAdviceController(req, res, next);
					});

					it('should call the correct template with the correct data', () => {
						expect(res.render).toHaveBeenCalledWith('register-of-advice/index/view.njk', {
							advice: [
								{
									adviceGivenBy: 'Test organisation',
									adviceTypeLabel: 'Enquiry from',
									date: { date: '2021-03-18', text: 'Date advice given:' },
									enquiryDetail:
										'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat magna arcu, eget interdum risus pretium suscipit. Nam vel urna ut tellus laoreet egestas. Integer venenatis justo a sem scelerisque fermentum.',
									link: '/register-of-advice/General-Advice-00001',
									linkTitle: 'View advice to Test organisation'
								},
								{
									adviceGivenBy: 'Test Inc',
									adviceTypeLabel: 'Enquiry from',
									date: { date: '2020-08-16', text: 'Date advice given:' },
									enquiryDetail:
										'Vestibulum sit amet sapien consequat, varius neque vel, bibendum erat. Cras mollis neque id sem feugiat consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed efficitur pharetra tortor, at tincidunt elit vulputate a.',
									link: '/register-of-advice/General-Advice-00002',
									linkTitle: 'View advice to Test Inc'
								}
							],
							itemsPerPage: 25,
							pageHeading: 'Register of advice',
							pageOptions: [1],
							pageTitle: 'Register of advice',
							paginationData: {
								currentPage: 1,
								fromRange: 1,
								itemsPerPage: 25,
								toRange: 2,
								totalItems: 2,
								totalPages: 1
							},
							paginationUrl: 'register-of-advice?page=:page',
							projectSearchURL: '/project-search',
							queryUrl: '',
							registerOfAdviceIndexURL: '/register-of-advice',
							resultsPerPage: {
								fifty: { active: false, link: '?searchTerm=&itemsPerPage=50', size: 50 },
								oneHundred: { active: false, link: '?searchTerm=&itemsPerPage=100', size: 100 },
								twentyFive: { active: true, link: '?searchTerm=&itemsPerPage=25', size: 25 }
							},
							searchTerm: ''
						});
					});
				});

				describe('and the general advice is from the BO DB', () => {
					const req = {
						get: (value) => req[value],
						host: 'mock-host',
						protocol: 'mock-protocol',
						query: {
							searchTerm: '',
							page: '',
							itemsPerPage: ''
						}
					};
					const res = { render: jest.fn() };
					const next = jest.fn();

					beforeEach(async () => {
						handler.mockImplementation(() => adviceFixture.adviceBOFixture);
						await getRegisterOfAdviceController(req, res, next);
					});

					it('should call the correct template with the correct data', () => {
						expect(res.render).toHaveBeenCalledWith('register-of-advice/index/view.njk', {
							advice: [
								{
									adviceGivenBy: 'Test organisation',
									adviceTypeLabel: 'Enquiry from',
									date: { date: '2024-02-01T00:00:00.000Z', text: 'Date advice given:' },
									enquiryDetail:
										'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed rutrum enim. Cras est neque, mollis ut bibendum sit amet, feugiat non risus. Vestibulum tristique orci sit amet lacus mattis, at fringilla tortor ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean gravida iaculis venenatis. Quisque non lorem nisl. Praesent efficitur magna lorem, vel laoreet nunc rutrum nec.',
									link: '/register-of-advice/76',
									linkTitle: 'Test advice title'
								},
								{
									adviceGivenBy: 'Test organisation 2',
									adviceTypeLabel: 'Enquiry from',
									date: { date: '2023-09-21T00:00:00.000Z', text: 'Date advice given:' },
									enquiryDetail: 'Test advice with attachment',
									link: '/register-of-advice/18',
									linkTitle: 'Advice With Document'
								}
							],
							itemsPerPage: 50,
							pageHeading: 'Register of advice',
							pageOptions: [1],
							pageTitle: 'Register of advice',
							paginationData: {
								currentPage: 1,
								fromRange: 1,
								itemsPerPage: 50,
								toRange: 2,
								totalItems: 2,
								totalPages: 1
							},
							paginationUrl: 'register-of-advice?page=:page',
							projectSearchURL: '/project-search',
							queryUrl: '',
							registerOfAdviceIndexURL: '/register-of-advice',
							resultsPerPage: {
								fifty: { active: false, link: '?searchTerm=&itemsPerPage=50', size: 50 },
								oneHundred: { active: false, link: '?searchTerm=&itemsPerPage=100', size: 100 },
								twentyFive: { active: true, link: '?searchTerm=&itemsPerPage=25', size: 25 }
							},
							searchTerm: ''
						});
					});
				});
			});
		});
	});
});
