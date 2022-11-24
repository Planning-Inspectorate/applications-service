const {
	addKeyValueToActiveSubmissionItem,
	getActiveSubmissionItemFiles,
	getActiveSubmissionItem,
	getSubmissionFilesLength,
	deleteSubmissionItem,
	deleteActiveSubmissionItemId,
	setActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/examination-session)', () => {
	describe('Functions rely in internal function but exported', () => {
		const itemToAssert = { itemId: 'active item' };
		const mockSubmissionItems = [itemToAssert];
		const examinationSession = {
			activeSubmissionItemId: 'active item',
			submissionItems: mockSubmissionItems
		};
		const mockSession = {};
		describe('#addKeyValueToActiveSubmissionItem', () => {
			describe('when adding a key and value to the submission item', () => {
				describe('and it is successful', () => {
					const mockKey = 'item';
					const mockValue = 'item value';
					beforeEach(() => {
						getExaminationSession.mockReturnValue(examinationSession);
						addKeyValueToActiveSubmissionItem(mockSession, mockKey, mockValue);
					});
					it('should add the key and value to the ', () => {
						expect(itemToAssert).toEqual({
							item: 'item value',
							itemId: 'active item'
						});
					});
				});
			});
		});
		describe('#setActiveSubmissionItem', () => {
			describe('When setting an active submission item', () => {
				describe('and there is no submission item', () => {
					const mockSession = {
						examination: {}
					};
					beforeEach(() => {
						getExaminationSession.mockReturnValue(mockSession.examination);
					});

					it('should throw an error', () => {
						expect(() => setActiveSubmissionItem(mockSession)).toThrowError('No submission item');
					});
				});
				describe('and there is not an active submission item', () => {
					const mockSession = {
						examination: {}
					};
					const mockSubmissionItem = {
						value: 'mock item id 1',
						text: 'mock submission item 1'
					};
					beforeEach(() => {
						getExaminationSession.mockReturnValue(mockSession.examination);
						setActiveSubmissionItem(mockSession, mockSubmissionItem);
					});
					it('should add the submission item to the examination submission items array', () => {
						expect(mockSession.examination.submissionItems).toEqual([
							{
								itemId: 'mock item id 1',
								submissionItem: 'mock submission item 1',
								submitted: false
							}
						]);
					});
					it('should update the active submission item id', () => {
						expect(mockSession.examination.activeSubmissionItemId).toEqual('mock item id 1');
					});
				});
				describe('and there is an active submission item', () => {
					const mockSession = {
						examination: {
							activeSubmissionItemId: 'mock item id 1',
							submissionItems: [
								{
									itemId: 'mock item id 1',
									submissionItem: 'mock submission item 1',
									submitted: false
								}
							]
						}
					};
					const mockSubmissionItem = {
						value: 'mock item id 2',
						text: 'mock submission item 2'
					};
					beforeEach(() => {
						getExaminationSession.mockReturnValue(mockSession.examination);
						setActiveSubmissionItem(mockSession, mockSubmissionItem);
					});
					it('should replace the active submission item in the submission items array', () => {
						expect(mockSession.examination.submissionItems).toEqual([
							{
								itemId: 'mock item id 2',
								submissionItem: 'mock submission item 2',
								submitted: false
							}
						]);
					});
					it('should update the active submission item id', () => {
						expect(mockSession.examination.activeSubmissionItemId).toEqual('mock item id 2');
					});
				});
			});
		});
		describe('#getActiveSubmissionItemFiles', () => {
			describe('When getting the files of the active item', () => {
				describe('and the submission item has files', () => {
					let result;
					beforeEach(() => {
						itemToAssert.files = ['an array of files'];
						getExaminationSession.mockReturnValue(examinationSession);
						result = getActiveSubmissionItemFiles(mockSession);
					});
					it('should return an array of files', () => {
						expect(result).toEqual(['an array of files']);
					});
				});
				describe('and the submission item', () => {
					describe('has no files', () => {
						beforeEach(() => {
							itemToAssert.files = undefined;
							getExaminationSession.mockReturnValue(examinationSession);
						});
						it('should throw an error', () => {
							expect(() => getActiveSubmissionItemFiles(mockSession)).toThrow(
								'No files for submission item'
							);
						});
					});
					describe('is not an array', () => {
						beforeEach(() => {
							itemToAssert.files = 'fella';
							getExaminationSession.mockReturnValue(examinationSession);
						});
						it('should throw an error', () => {
							expect(() => getActiveSubmissionItemFiles(mockSession)).toThrow(
								'Submission item files is not an array'
							);
						});
					});
					describe('array is empty', () => {
						beforeEach(() => {
							itemToAssert.files = [];
							getExaminationSession.mockReturnValue(examinationSession);
						});
						it('should throw an error', () => {
							expect(() => getActiveSubmissionItemFiles(mockSession)).toThrow(
								'Submission item files length is 0'
							);
						});
					});
				});
			});
		});
	});
	describe('#getActiveSubmissionItem', () => {
		const mockSession = {};
		const itemToFind = { itemId: 'active item' };
		const mockSubmissionItems = [itemToFind];
		const mockExaminationSession = {
			activeSubmissionItemId: 'active item',
			submissionItems: mockSubmissionItems
		};
		describe('When getting the active submission item', () => {
			describe('and the submission item is found', () => {
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getActiveSubmissionItem(mockSession);
				});
				it('should return the active submission item', () => {
					expect(result).toEqual(itemToFind);
				});
			});
			describe('and the submission item can NOT be found', () => {
				beforeEach(() => {
					mockExaminationSession.activeSubmissionItemId = 'i do not exist';
					getExaminationSession.mockReturnValue(mockExaminationSession);
				});
				it('should throw an error', () => {
					expect(() => getActiveSubmissionItem(mockSession)).toThrow(
						'Can not find active submission item'
					);
				});
			});
		});
	});
	describe('#getSelectedDeadlineFilesLength', () => {
		describe('When getting the size of all files stored in session for all deadlines', () => {
			describe('and all deadline have files', () => {
				const mockExaminationSession = {
					submissionItems: [{ files: ['file-1', 'file-2'] }, { files: ['file-1'] }]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getSubmissionFilesLength('');
				});

				it('should return the calculated length of all the files', () => {
					expect(result).toEqual(3);
				});
			});
			describe('and a deadline does not have any files but another does', () => {
				const mockExaminationSession = {
					submissionItems: [{ files: ['file-1', 'file-2'] }, { text: 'no files here' }]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getSubmissionFilesLength('');
				});
				it('should calc the length of the deadline files that do have files', () => {
					expect(result).toEqual(2);
				});
			});
		});
	});

	describe('#deleteSubmissionItem', () => {
		describe('When deleting a submission item', () => {
			const mockSession = {};
			const mockItemIdToDelete = 0;
			const mockSubmissionItems = [{ itemId: 0 }];
			const mockExaminationSession = {
				submissionItems: mockSubmissionItems
			};
			describe('and the item is on the array', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					deleteSubmissionItem(mockSession, mockItemIdToDelete);
				});
				it('should remove the item from the array', () => {
					expect(mockExaminationSession.submissionItems).toEqual([]);
				});
			});
			describe('and the item is on the array with other items', () => {
				beforeEach(() => {
					mockExaminationSession.submissionItems.push({ itemId: 1 });
					getExaminationSession.mockReturnValue(mockExaminationSession);
					deleteSubmissionItem(mockSession, mockItemIdToDelete);
				});
				it('should remove the item from the array', () => {
					expect(mockExaminationSession.submissionItems).toEqual([{ itemId: 1 }]);
				});
			});
			describe('and the item is not in the array', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					deleteSubmissionItem(mockSession, mockItemIdToDelete);
				});
				it('should remain the same', () => {
					expect(mockSubmissionItems).toEqual(mockSubmissionItems);
				});
			});
		});
	});
	describe('#deleteActiveSubmissionItemId', () => {
		describe('When deleting the active item', () => {
			const mockExaminationSession = {
				activeSubmissionItemId: 'mock active item'
			};
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				deleteActiveSubmissionItemId();
			});
			it('should delete the active item key from the examination session', () => {
				expect(mockExaminationSession).toEqual({});
			});
		});
	});
});
