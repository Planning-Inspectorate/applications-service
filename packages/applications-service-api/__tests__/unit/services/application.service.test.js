const { getBackOfficeApplication } = require('../../../src/services/application.service');

jest.mock('../../../src/repositories/project.repository');
const { getByCaseReference } = require('../../../src/repositories/project.repository');

describe('application.service', () => {
	describe('getBackOfficeApplication', () => {
		it('invokes repository', async () => {
			const caseReference = 'EN0110004';
			await getBackOfficeApplication(caseReference);
			expect(getByCaseReference).toBeCalledWith(caseReference);
		});
	});
});
