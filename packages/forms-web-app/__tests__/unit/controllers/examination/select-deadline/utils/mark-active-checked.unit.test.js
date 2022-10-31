const {
	markActiveDeadlineItemAsChecked
} = require('../../../../../../src/controllers/examination/select-deadline/utils/markActiveDeadlineItemAsChecked');

describe('controllers/examination/select-deadline/utils/markActiveDeadlineItemAsChecked', () => {
	describe('#markActiveDeadlineItemAsChecked', () => {
		describe('when marking an item in an array of objects as checked', () => {
			describe('and the item in the array matches the item provided', () => {
				const arrayOfItems = [{ value: 'do not mark' }, { value: 'marker' }];
				const itemToMarkAsChecked = 'marker';
				const result = markActiveDeadlineItemAsChecked(arrayOfItems, itemToMarkAsChecked);
				it('should add checked to the item and return the array fo objects', () => {
					expect(result).toEqual([
						{
							value: 'do not mark'
						},
						{
							checked: 'checked',
							value: 'marker'
						}
					]);
				});
			});
			describe('and the items in the array do NOT match any item provided', () => {
				const arrayOfItems = [{ value: 'do not mark' }, { value: 'do not mark 2' }];
				const itemToMarkAsChecked = 'marker';
				const result = markActiveDeadlineItemAsChecked(arrayOfItems, itemToMarkAsChecked);
				it('should return the array', () => {
					expect(result).toEqual(arrayOfItems);
				});
			});
		});
	});
});
