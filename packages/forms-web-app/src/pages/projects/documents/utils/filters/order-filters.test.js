const { orderFilters } = require('./order-filters');

describe('controllers/projects/docments/utils/filters/order-filters', () => {
	describe('#orderFilters', () => {
		describe('When ordering the filters for the documents page', () => {
			describe(`and Developer's Application is present`, () => {
				describe(`and Developer's Application is presesnt`, () => {
					describe('and is not positioned second in the array', () => {
						let result;
						const mockFilters = [
							{ label: 'mock filter label 1' },
							{ label: 'mock filter label 2' },
							{ label: `Developer's Application` }
						];
						beforeEach(() => {
							result = orderFilters(mockFilters);
						});
						it(`should return the mock filters with Developer's Application positioned second in the array`, () => {
							expect(result).toEqual([
								{ label: 'mock filter label 1' },
								{ label: `Developer's Application` },
								{ label: 'mock filter label 2' }
							]);
						});
					});
					describe('and is positioned second in the array', () => {
						let result;
						const mockFilters = [
							{ label: 'mock filter label 1' },
							{ label: `Developer's Application` },
							{ label: 'mock filter label 2' }
						];
						beforeEach(() => {
							result = orderFilters(mockFilters);
						});
						it(`should return the mock filters array without making any changes`, () => {
							expect(result).toEqual([
								{ label: 'mock filter label 1' },
								{ label: `Developer's Application` },
								{ label: 'mock filter label 2' }
							]);
						});
					});
				});
				describe(`and Developer's Application is not presesnt`, () => {
					let result;
					const mockFilters = [{ label: 'mock filter label 1' }, { label: 'mock filter label 2' }];
					beforeEach(() => {
						result = orderFilters(mockFilters);
					});
					it(`should return the mock filters array without making any changes`, () => {
						expect(result).toEqual([
							{ label: 'mock filter label 1' },
							{ label: 'mock filter label 2' }
						]);
					});
				});
			});
		});
	});
});
