const { getSortByLinks } = require('./get-sort-by-links');

const sampleQuery1 = { sortBy: '+stage', itemsPerPage: '10', page: '1' };
const sampleQuery2 = { sortBy: '-applicant', itemsPerPage: '25' };

const labels1 = [
	{
		name: 'Project name',
		value: 'projectName'
	},
	{
		name: 'Applicant',
		value: 'applicant'
	},
	{
		name: 'Stage',
		value: 'stage'
	}
];

const labels2 = [
	{
		name: 'Project name',
		value: 'projectName'
	},
	{
		name: 'Applicant'
	},
	{
		name: 'Stage'
	}
];

describe('pages/_utils', () => {
	describe('#getSortByLinks', () => {
		it('should build sorting links from given query and labels objects', () => {
			const result1 = getSortByLinks(sampleQuery1, labels1);
			const result2 = getSortByLinks(sampleQuery2, labels1);

			expect(result1).toEqual([
				{
					link: '?sortBy=%2BprojectName&itemsPerPage=10&page=1',
					name: 'Project name',
					sort: 'none'
				},
				{ link: '?sortBy=%2Bapplicant&itemsPerPage=10&page=1', name: 'Applicant', sort: 'none' },
				{ link: '?sortBy=-stage&itemsPerPage=10&page=1', name: 'Stage', sort: 'ascending' }
			]);

			expect(result2).toEqual([
				{ link: '?sortBy=%2BprojectName&itemsPerPage=25', name: 'Project name', sort: 'none' },
				{ link: '?sortBy=%2Bapplicant&itemsPerPage=25', name: 'Applicant', sort: 'descending' },
				{ link: '?sortBy=%2Bstage&itemsPerPage=25', name: 'Stage', sort: 'none' }
			]);
		});

		it('should NOT build links for labels without value', () => {
			const result3 = getSortByLinks(sampleQuery1, labels2);

			expect(result3).toEqual([
				{
					link: '?sortBy=%2BprojectName&itemsPerPage=10&page=1',
					name: 'Project name',
					sort: 'none'
				},
				{ name: 'Applicant' },
				{ name: 'Stage' }
			]);
		});
	});
});
