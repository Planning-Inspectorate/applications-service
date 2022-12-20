const {
	getSummaryListName
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/name');

const {
	getDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName
} = require('../../../../../../../src/controllers/examination/session/deadline');
const {
	getSummaryListItem
} = require('../../../../../../../src/controllers/utils/get-summary-list-item');

jest.mock('../../../../../../../src/controllers/examination/session/deadline', () => ({
	getDeadlineDetailsSubmittingFor: jest.fn(),
	getDeadlineDetailsName: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/name', () => {
	describe('#getSummaryListName', () => {
		describe('When getting the name summary list item for the check your answers page', () => {
			const req = {
				session: { mockSession: 'mock session' }
			};
			const mockDeadlineNameValue = 'mock name';
			const mockSummaryListItem = {
				mockSummaryListItem: 'mock summary list item'
			};
			beforeEach(() => {
				getDeadlineDetailsName.mockReturnValue(mockDeadlineNameValue);
				getSummaryListItem.mockReturnValue(mockSummaryListItem);
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
					getDeadlineDetailsSubmittingFor.mockReturnValue('myself');
					result = getSummaryListName(req.session);
				});
				it('should get the summary list item with the myself title and value', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						'Full name',
						mockDeadlineNameValue,
						'/examination/your-name'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
			describe('and deadline submitting for is equal to organisation', () => {
				let result;
				beforeEach(() => {
					getDeadlineDetailsSubmittingFor.mockReturnValue('organisation');
					result = getSummaryListName(req.session);
				});
				it('should get the summary list item with the organisation title and value', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						`Organisation's name`,
						mockDeadlineNameValue,
						'/examination/your-organisation-name'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
			describe('and deadline submitting for is equal to agent', () => {
				let result;
				beforeEach(() => {
					getDeadlineDetailsSubmittingFor.mockReturnValue('agent');
					result = getSummaryListName(req.session);
				});
				it('should get the summary list item with the agent title and value', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						'Submitting on behalf of',
						mockDeadlineNameValue,
						'/examination/name-of-person-or-group'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
