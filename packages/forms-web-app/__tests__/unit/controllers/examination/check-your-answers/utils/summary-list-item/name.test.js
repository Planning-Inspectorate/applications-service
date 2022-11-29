const {
	getSummaryListName
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/name');

const {
	getDeadlineSubmittingFor,
	getDeadlineName
} = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineSubmittingFor: jest.fn(),
	getDeadlineName: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item-with-html', () => ({
	getSummaryListItemWithHtml: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/name', () => {
	describe('#getSummaryListName', () => {
		describe('When getting the name summary list item for the check your answers page', () => {
			const req = {
				session: { mockSession: 'mock session' }
			};
			const mockDeadlineName = 'mock deadline name';
			const mockSummaryListItemWithHtml = {
				mockSummaryListItemWithHtml: 'mock summary list item with html'
			};
			beforeEach(() => {
				getDeadlineName.mockReturnValue(mockDeadlineName);
				getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
			});
			describe('and deadline submitting for is equal to myself, organisation or agent', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListName(req.session)).toThrowError(
						'Summary list item name can not be assigned'
					);
				});
			});
			describe('and deadline submitting for is equal to myself', () => {
				let result;
				beforeEach(() => {
					getDeadlineSubmittingFor.mockReturnValue('myself');
					result = getSummaryListName(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineSubmittingFor).toHaveBeenCalledWith(req.session);
					expect(getDeadlineName).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith('Full name', mockDeadlineName);
				});
				it('should return the name summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
			describe('and deadline submitting for is equal to organisation', () => {
				let result;
				beforeEach(() => {
					getDeadlineSubmittingFor.mockReturnValue('organisation');
					result = getSummaryListName(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineSubmittingFor).toHaveBeenCalledWith(req.session);
					expect(getDeadlineName).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						`Organisation's name`,
						mockDeadlineName
					);
				});
				it('should return the name summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
			describe('and deadline submitting for is equal to agent', () => {
				let result;
				beforeEach(() => {
					getDeadlineSubmittingFor.mockReturnValue('agent');
					result = getSummaryListName(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineSubmittingFor).toHaveBeenCalledWith(req.session);
					expect(getDeadlineName).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						'Submitting on behalf of',
						mockDeadlineName
					);
				});
				it('should return the name summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
		});
	});
});
