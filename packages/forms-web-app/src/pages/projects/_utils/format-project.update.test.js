const { formatProjectUpdate } = require('./format-project-update');

describe('pages/projects/_utils/format-project-update', () => {
	it('returns English update content and date if language is English (default)', () => {
		const projectUpdate = {
			updateContentEnglish: 'some content in English',
			updateContentWelsh: 'some content in Welsh',
			updateDate: '2023-08-04'
		};

		const expectedOutput = {
			content: 'some content in English',
			date: '4 August 2023'
		};

		expect(formatProjectUpdate(projectUpdate)).toEqual(expectedOutput);
	}),
		it('returns Welsh update data and date if language is Welsh and Welsh update content exists', () => {
			const projectUpdate = {
				updateContentEnglish: 'some content in English',
				updateContentWelsh: 'some content in Welsh',
				updateDate: '2024-09-05'
			};

			const expectedOutput = {
				content: 'some content in Welsh',
				date: '5 Medi 2024'
			};

			expect(formatProjectUpdate(projectUpdate, 'cy')).toEqual(expectedOutput);
		}),
		it('returns English update data and Welsh date when language is Welsh and Welsh update content does not exist', () => {
			const projectUpdate = {
				updateContentEnglish: 'some content in English',
				updateDate: '2024-03-23'
			};

			const expectedOutput = {
				content: 'some content in English',
				date: '23 Mawrth 2024'
			};

			expect(formatProjectUpdate(projectUpdate, 'cy')).toEqual(expectedOutput);
		});
});
