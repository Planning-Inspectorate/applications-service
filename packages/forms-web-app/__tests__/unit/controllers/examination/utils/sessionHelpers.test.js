let config = require('../../../../../src/routes/config');
const {
	getSelectedDeadlineItem,
	getSelectedDeadlineItemFromSession,
	getSelectedDeadlineFilesLength
} = require('../../../../../src/controllers/examination/utils/sessionHelpers');

jest.mock('../../../../../src/routes/config', () => ({
	routesConfig: {}
}));

describe('controllers/examination/utils/sessionHelpers', () => {
	describe('getSelectedDeadlineItem', () => {
		describe('When getting the selected deadline item from session', () => {
			describe('and the session does not have a examination session id', () => {
				let result;
				const session = {};
				beforeEach(() => {
					config.routesConfig = {
						examination: {
							sessionId: 'mock-session-id',
							pages: {
								selectDeadline: {}
							}
						}
					};

					result = getSelectedDeadlineItem(session);
				});
				it('should return false', () => {
					expect(result).toBe(false);
				});
			});
			describe('and the session does not have a selected deadline item active id', () => {
				let result;
				const session = {
					'mock-session-id': 'fella'
				};
				beforeEach(() => {
					config.routesConfig = {
						examination: {
							sessionId: 'mock-session-id',
							pages: {
								selectDeadline: {}
							}
						}
					};
					result = getSelectedDeadlineItem(session);
				});
				it('should return false', () => {
					expect(result).toBe(false);
				});
			});
			describe('and the session does not have a selected deadline items', () => {
				let result;
				let session = {
					'mock-session-id': {
						'mock-sessionIdPrimary': {
							'mock-sessionIdSecondary': 'empty'
						}
					}
				};
				beforeEach(() => {
					config.routesConfig = {
						examination: {
							sessionId: 'mock-session-id',
							pages: {
								selectDeadline: {
									sessionIdPrimary: 'mock-sessionIdPrimary',
									sessionIdSecondary: 'mock-sessionIdSecondary'
								}
							}
						}
					};
					result = getSelectedDeadlineItem(session);
				});
				it('should return false', () => {
					expect(result).toBe(false);
				});
			});
			describe('and the session does not have a selected deadline item', () => {
				let result;
				let session = {
					'mock-session-id': {
						'mock-sessionIdPrimary': {
							'mock-sessionIdSecondary': 'item-active-id',
							'mock-sessionIdTertiary': {}
						}
					}
				};
				beforeEach(() => {
					config.routesConfig = {
						examination: {
							sessionId: 'mock-session-id',
							pages: {
								selectDeadline: {
									sessionIdPrimary: 'mock-sessionIdPrimary',
									sessionIdSecondary: 'mock-sessionIdSecondary',
									sessionIdTertiary: 'mock-sessionIdTertiary'
								}
							}
						}
					};
					result = getSelectedDeadlineItem(session);
				});
				it('should return false', () => {
					expect(result).toBe(false);
				});
			});
			describe('and the session has a selected Deadline item', () => {
				let result;
				let session = {
					'mock-session-id': {
						'mock-sessionIdPrimary': {
							'mock-sessionIdSecondary': 'item-active-id',
							'mock-sessionIdTertiary': {
								'item-active-id': { submissionItem: 'deadline item' }
							}
						}
					}
				};
				beforeEach(() => {
					config.routesConfig = {
						examination: {
							sessionId: 'mock-session-id',
							pages: {
								selectDeadline: {
									sessionIdPrimary: 'mock-sessionIdPrimary',
									sessionIdSecondary: 'mock-sessionIdSecondary',
									sessionIdTertiary: 'mock-sessionIdTertiary'
								}
							}
						}
					};
					result = getSelectedDeadlineItem(session);
				});
				it('should return return the dealine item', () => {
					expect(result).toBe('deadline item');
				});
			});
		});
	});

	describe('#getSelectedDeadlineFilesLength', () => {
		describe('When getting the size of all files stored in session for all deadlines', () => {
			describe('and all deadline have files', () => {
				const mockSession = {
					examination: {
						selectedDeadlineItems: {
							items: {
								0: {
									files: ['file-1', 'file-2']
								},
								1: {
									files: ['file-1']
								}
							}
						}
					}
				};
				const result = getSelectedDeadlineFilesLength(mockSession);
				it('should return the calculated length of all the files', () => {
					expect(result).toEqual(3);
				});
			});
			describe('and a deadline does not have any files but another does', () => {
				const mockSession = {
					examination: {
						selectedDeadlineItems: {
							items: {
								0: {
									files: ['file-1', 'file-2']
								},
								1: {}
							}
						}
					}
				};
				const result = getSelectedDeadlineFilesLength(mockSession);
				it('should calc the length of the deadline files that do have files', () => {
					expect(result).toEqual(2);
				});
			});
		});
	});

	describe('#getSelectedDeadlineItemFromSession', () => {
		describe('When getting the selected deadline items from session', () => {
			describe('and there is an active id', () => {
				const deadlineItems = {
					1: {
						value: 'deadline item one'
					},
					2: {
						value: 'deadline item two'
					}
				};
				const mockExaminationSession = {
					selectedDeadlineItems: {
						activeId: 1,
						items: deadlineItems
					}
				};
				let result;
				beforeEach(() => {
					result = getSelectedDeadlineItemFromSession(mockExaminationSession);
				});
				it('should return the active deadline item', () => {
					expect(result).toEqual({ value: 'deadline item one' });
				});
			});
			describe('and there is no an id', () => {
				const deadlineItems = {
					1: {
						value: 'deadline item one'
					},
					2: {
						value: 'deadline item two'
					}
				};
				const mockExaminationSession = {
					selectedDeadlineItems: {
						items: deadlineItems
					}
				};
				it('should throw an error', () => {
					expect(() => getSelectedDeadlineItemFromSession(mockExaminationSession)).toThrow(
						'No active id'
					);
				});
			});
		});
	});
});
