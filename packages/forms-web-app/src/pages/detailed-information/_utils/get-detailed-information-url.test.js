const { getDetailedInformationURL } = require('./get-detailed-information-url.js');

describe('pages/detailed-information/_utils/get-detailed-information-url.js', () => {
	describe('#getDetailedInformationURL', () => {
		describe('When getting the detailed information URL', () => {
			const detailedInformationURL = getDetailedInformationURL();
			it('should return the detailed information URL', () => {
				expect(detailedInformationURL).toEqual('/detailed-information');
			});
		});
	});
});
