const { getSummaryListItemPersonalInformation } = require('./index');

describe('examination/check-submission-item/utils/summary-list-item', () => {
	describe('#getSummaryListItemPersonalInformation', () => {
		describe('When getting the personal information summary list item', () => {
			describe('and the submission item has a personal information value', () => {
				describe('and is equal to "yes"', () => {
					describe('and the submission item has a submission type value', () => {
						describe('and is equal to "comment"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'comment'
							};

							const result = getSummaryListItemPersonalInformation(mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: '/examination/comment-has-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('and is equal to "upload"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'upload'
							};

							const result = getSummaryListItemPersonalInformation(mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: '/examination/files-have-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('and is equal to "both"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'both'
							};

							const result = getSummaryListItemPersonalInformation(mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: '/examination/comment-file-has-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('that does not match a required option', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: ''
							};

							it('should return throw an error', () => {
								expect(() => getSummaryListItemPersonalInformation(mockSubmissionItem)).toThrow(
									'Submission item submission type value does not match a required option'
								);
							});
						});
					});
				});
				describe('and is equal to "no"', () => {
					const mockSubmissionItem = {
						personalInformation: 'no',
						submissionType: 'comment'
					};

					const result = getSummaryListItemPersonalInformation(mockSubmissionItem);

					it('should return a summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: '/examination/comment-has-personal-information-or-not',
										text: 'Change',
										visuallyHiddenText: 'Personal information'
									}
								]
							},
							key: { text: 'Personal information' },
							value: { html: 'No' }
						});
					});
				});
				describe('that does not match a required option', () => {
					const mockSubmissionItem = {
						personalInformation: ''
					};

					it('should return throw an error', () => {
						expect(() => getSummaryListItemPersonalInformation(mockSubmissionItem)).toThrow(
							'Submission item personal information value is not a required option'
						);
					});
				});
			});
		});
	});
});
