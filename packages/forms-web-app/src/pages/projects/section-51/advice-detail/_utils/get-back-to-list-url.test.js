const { getBackToListURL } = require('./get-back-to-list-url');

describe('pages/projects/section-51/advice-detail/_utils/get-back-to-list-url', () => {
	describe('#getBackToListURL', () => {
		describe('When getting the back to list URL', () => {
			describe('and the user is viewing the register of advice detail page', () => {
				// describe('and the previous page is the register of advice page', () => {
				// 	let backToListURL;
				//
				// 	const refURL = '/register-of-advice?searchTerm=test&itemsPerPage=50';
				// 	const path = '/register-of-advice/mock-id';
				// 	const caseRef = 'mock-case-ref';
				// 	const id = 'mock-id';
				//
				// 	beforeEach(() => {
				// 		backToListURL = getBackToListURL(refURL, path, caseRef, id);
				// 	});
				// 	it('should return the Referrer URL', () => {
				// 		expect(backToListURL).toEqual('/register-of-advice?searchTerm=test&itemsPerPage=50');
				// 	});
				// });

				describe('and the previous page is not the register of advice page', () => {
					let backToListURL;

					const refURL = null;
					const path = '/register-of-advice/mock-id';
					const caseRef = 'mock-case-ref';
					const id = 'mock-id';

					beforeEach(() => {
						backToListURL = getBackToListURL(refURL, path, caseRef, id);
					});
					it('should return the register of advice index URL', () => {
						expect(backToListURL).toEqual('/register-of-advice');
					});
				});
			});

			describe('and the user is not viewing the register of advice detail page', () => {
				let backToListURL;

				const refURL = null;
				const path = '/projects/mock-case-ref/s51advice/mock-id';
				const caseRef = 'mock-case-ref';
				const id = 'mock-id';

				beforeEach(() => {
					backToListURL = getBackToListURL(refURL, path, caseRef, id);
				});
				it('should return the section 51 URL', () => {
					expect(backToListURL).toEqual('/projects/mock-case-ref/s51advice');
				});
			});
		});
	});
});
