const { getProjectPromoterName, setProjectPromoterName } = require('./index');

describe('controllers/projects/session', () => {
	describe('#getProjectPromoterName', () => {
		describe('When getting the project promoter name from the session', () => {
			describe('and there is no project promoter name in the session', () => {
				const mockSession = {};
				it('should throw an error', () => {
					expect(() => getProjectPromoterName(mockSession)).toThrow(
						'Project promoter name not found'
					);
				});
			});
			describe('and there is a project promoter name in the session', () => {
				let projectPromoterName;
				beforeEach(() => {
					const mockSession = {
						promoterName: 'mock promoter name'
					};
					projectPromoterName = getProjectPromoterName(mockSession);
				});
				it('should return the promoter name in the mock session', () => {
					expect(projectPromoterName).toEqual('mock promoter name');
				});
			});
		});
	});
	describe('#setProjectPromoterName', () => {
		describe('When setting the project promoter name to the session', () => {
			const mockSession = {};
			const mockProjectPromoterName = 'mock project promoter name';
			beforeEach(() => {
				setProjectPromoterName(mockSession, mockProjectPromoterName);
			});
			it('should add the project promoter name to the session', () => {
				expect(mockSession.promoterName).toEqual(mockProjectPromoterName);
			});
		});
	});
});
