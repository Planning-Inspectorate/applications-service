const {
	mapFilters,
	mapDocuments,
	mapBackOfficeDocuments
} = require('../../../src/utils/document.mapper');

describe('document mapper functions', () => {
	describe('mapDocuments', () => {
		it('maps NI documents to v3 response body format', () => {
			const niDocuments = [
				{
					id: 1000,
					dataID: 'EN0100085-0000001',
					case_reference: 'EN0100085',
					category: "Developer's Application",
					Stage: 5,
					type: 'Other Documents',
					filter_1: 'Deadline 6',
					filter_2: null,
					description: 'Deadline 6 Submission - Cover Letter',
					size: 209077,
					mime: 'application/pdf',
					path: 'file.pdf',
					date_published: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					doc_reference: 'someref',
					author: 'someone',
					last_modified: '2023-06-19T10:50:31.957Z',
					date_created: '2023-06-19T10:50:31.957Z'
				},
				{
					id: 1001,
					dataID: 'EN0100085-0000001',
					case_reference: 'EN0100085',
					personal_name: 'Joe Bloggs',
					Stage: 5,
					type: 'Other Documents',
					filter_1: 'Deadline 6',
					filter_2: null,
					description: 'Deadline 6 Submission - Cover Letter 2',
					size: 209077,
					mime: 'application/pdf',
					path: 'file.pdf',
					date_published: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					doc_reference: 'someref',
					author: 'someone',
					last_modified: '2023-06-19T10:50:31.957Z',
					date_created: '2023-06-19T10:50:31.957Z'
				}
			];

			const expectedResponseDocuments = [
				{
					id: 1000,
					dataId: 'EN0100085-0000001',
					caseReference: 'EN0100085',
					category: "Developer's Application",
					stage: 5,
					type: 'Other Documents',
					filter1: 'Deadline 6',
					filter2: null,
					description: 'Deadline 6 Submission - Cover Letter',
					size: 209077,
					mime: 'application/pdf',
					path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/file.pdf',
					datePublished: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					docReference: 'someref',
					author: 'someone',
					lastModified: '2023-06-19T10:50:31.957Z',
					dateCreated: '2023-06-19T10:50:31.957Z'
				},
				{
					id: 1001,
					dataId: 'EN0100085-0000001',
					caseReference: 'EN0100085',
					personalName: "Joe Bloggs",
					stage: 5,
					type: 'Other Documents',
					filter1: 'Deadline 6',
					filter2: null,
					description: 'Deadline 6 Submission - Cover Letter 2',
					size: 209077,
					mime: 'application/pdf',
					path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/file.pdf',
					datePublished: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					docReference: 'someref',
					author: 'someone',
					lastModified: '2023-06-19T10:50:31.957Z',
					dateCreated: '2023-06-19T10:50:31.957Z'
				}
			];

			expect(mapDocuments(niDocuments)).toEqual(expectedResponseDocuments);
		});
	});

	describe('mapBackOfficeDocuments', () => {
		it('maps Back Office documents to v3 response body format', () => {
			const backOfficeDocuments = [
				{
					id: 1000,
					caseRef: 'EN0100085',
					stage: 'examination',
					documentType: 'Other Documents',
					filter1: 'Deadline 6',
					filter2: null,
					description: 'Deadline 6 Submission - Cover Letter',
					size: 209077,
					mime: 'application/pdf',
					documentURI: 'https://example.org/file.pdf',
					datePublished: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					documentReference: 'someref',
					author: 'someone',
					modifiedAt: '2023-06-19T10:50:31.957Z',
					createdAt: '2023-06-19T10:50:31.957Z'
				}
			];

			const expectedResponseDocuments = [
				{
					id: 1000,
					dataId: 'someref',
					caseReference: 'EN0100085',
					stage: 'examination',
					type: 'Other Documents',
					filter1: 'Deadline 6',
					filter2: null,
					description: 'Deadline 6 Submission - Cover Letter',
					size: 209077,
					mime: 'application/pdf',
					path: 'https://example.org/file.pdf',
					datePublished: '2023-03-26T00:00:00.000',
					representative: 'somerep',
					docReference: 'someref',
					author: 'someone',
					lastModified: '2023-06-19T10:50:31.957Z',
					dateCreated: '2023-06-19T10:50:31.957Z'
				}
			];

			expect(mapBackOfficeDocuments(backOfficeDocuments)).toEqual(expectedResponseDocuments);
		});
	});

	describe('mapFilters', () => {
		it.each([
			['stage', 1, 'Pre-application'],
			['stage', 2, 'Acceptance'],
			['stage', 3, 'Pre-examination'],
			['stage', 4, 'Examination'],
			['stage', 5, 'Recommendation'],
			['stage', 6, 'Recommendation and Decision'],
			['stage', 7, 'Post-decision'],
			['stage', 'pre-application', 'Pre-application'],
			['stage', 'acceptance', 'Acceptance'],
			['stage', 'pre-examination', 'Pre-examination'],
			['stage', 'examination', 'Examination'],
			['stage', 'recommendation', 'Recommendation'],
			['stage', 'decision', 'Decision'],
			['stage', 'post_decision', 'Post-decision'],
			['stage', 'developers_application', "Developer's Application"],
			['category', "Developer's Application", "Developer's Application"],
			['category', "Developer's application", "Developer's Application"],
			['category', 'developers_application', "Developer's Application"],
			['category', 'other', 'other'],
			['category', 'None', 'None'],
			['stage', 99999, undefined]
		])(
			'given filter name %s and value %s, adds label %s',
			(filterName, filterValue, expectedLabel) => {
				const filter = [
					{
						[filterName]: filterValue,
						filter1: 'something',
						total: 1
					}
				];
				const mappedFilters = mapFilters(filter);

				expect(mappedFilters[0]).toEqual(
					expect.objectContaining({
						name: filterName,
						value: filterValue,
						label: expectedLabel,
						type: [
							{
								count: 1,
								value: 'something'
							}
						]
					})
				);
			}
		);

		it('returns no filters if filter name is not included in mapping', () => {
			const mappedFilters = mapFilters([
				{
					something: 'something',
					filter1: 'something',
					total: 1
				}
			]);
			expect(mappedFilters).toEqual([]);
		});

		it('sorts stages into their logical order (NI labelling)', () => {
			const mappedFilters = mapFilters([
				{ stage: 2, filter1: 'something', total: 1 },
				{ stage: 4, filter1: 'something', total: 1 },
				{ stage: 1, filter1: 'something', total: 1 }
			]);

			expect(mappedFilters[0].value).toEqual(1);
			expect(mappedFilters[1].value).toEqual(2);
			expect(mappedFilters[2].value).toEqual(4);
		});

		it('sorts stages into their logical order (Back Office labelling)', () => {
			const mappedFilters = mapFilters([
				{ stage: 'decision', filter1: 'something', total: 1 },
				{ stage: 'examination', filter1: 'something', total: 1 },
				{ stage: 'pre-application', filter1: 'something', total: 1 }
			]);

			expect(mappedFilters[0].value).toEqual('pre-application');
			expect(mappedFilters[1].value).toEqual('examination');
			expect(mappedFilters[2].value).toEqual('decision');
		});
	});
});
