const {
	isRegistrationOpen,
	isRegistrationReOpened,
	isRegistrationClosed
} = require('./is-registration-open');
const { featureFlag } = require('../../../../../config');

jest.mock('../../../../../config', () => ({
	featureFlag: {
		openRegistrationCaseReferences: []
	}
}));

describe('pages/projects/register/index/_utils/is-registration-open', () => {
	const dateBeforeYesterday = '2023-01-01';
	const dateYesterday = '2023-01-02';
	const dateToday = '2023-01-03';
	const dateTomorrow = '2023-01-04';
	const dateAfterTomorrow = '2023-01-05';

	let appData;
	const caseRef = 'mock case ref';

	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date(dateToday));
		featureFlag.openRegistrationCaseReferences = [];
		appData = {
			DateOfRepresentationPeriodOpen: null,
			DateOfRelevantRepresentationClose: dateBeforeYesterday,
			DateOfReOpenRelevantRepresentationStart: null,
			DateOfReOpenRelevantRepresentationClose: null
		};
	});
	describe('#isRegistrationOpen', () => {
		describe('When the close date is not set and the open date has been reached', () => {
			let registrationOpen;

			beforeEach(() => {
				appData.DateOfRepresentationPeriodOpen = dateYesterday;
				appData.DateOfRelevantRepresentationClose = null;
				registrationOpen = isRegistrationOpen(appData);
			});
			it('should return true', () => {
				expect(registrationOpen).toEqual(true);
			});
		});

		describe('When the close date is not set and the open date has NOT been reached', () => {
			let registrationOpen;

			beforeEach(() => {
				appData.DateOfRepresentationPeriodOpen = dateAfterTomorrow;
				appData.DateOfRelevantRepresentationClose = null;
				registrationOpen = isRegistrationOpen(appData);
			});
			it('should return false', () => {
				expect(registrationOpen).toEqual(false);
			});
		});

		describe('When both open and close date are not set', () => {
			let registrationOpen;

			beforeEach(() => {
				appData.DateOfRepresentationPeriodOpen = null;
				appData.DateOfRelevantRepresentationClose = null;
				registrationOpen = isRegistrationOpen(appData);
			});
			it('should return false', () => {
				expect(registrationOpen).toEqual(false);
			});
		});

		describe('Open date', () => {
			beforeEach(() => {
				appData.DateOfRelevantRepresentationClose = dateAfterTomorrow;
			});
			describe('When the open date is set to yesterday', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRepresentationPeriodOpen = dateYesterday;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the open date is set to today', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRepresentationPeriodOpen = dateToday;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the open date is set to tomorrow', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRepresentationPeriodOpen = dateTomorrow;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});
		});

		describe('Close date', () => {
			beforeEach(() => {
				appData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
			});
			describe('When the close date is set to yesterday', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRelevantRepresentationClose = dateYesterday;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});

			describe('When the close date is set to today', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRelevantRepresentationClose = dateToday;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the close date is set to tomorrow', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfRelevantRepresentationClose = dateTomorrow;
					registrationOpen = isRegistrationOpen(appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});
		});
	});

	describe('#isRegistrationReOpened', () => {
		describe('When the project case reference is re-opened', () => {
			let registrationOpen;

			beforeEach(() => {
				featureFlag.openRegistrationCaseReferences = ['mock case ref'];
				registrationOpen = isRegistrationOpen(caseRef, appData);
			});
			it('should return true', () => {
				expect(registrationOpen).toEqual(true);
			});
		});

		describe('Re-open date', () => {
			beforeEach(() => {
				appData.DateOfReOpenRelevantRepresentationClose = dateAfterTomorrow;
			});
			describe('When the re-open date is set to yesterday', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationStart = dateYesterday;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the re-open date is set to today', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationStart = dateToday;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the re-open date is set to tomorrow', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationStart = dateTomorrow;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});
		});

		describe('Re-open close date', () => {
			beforeEach(() => {
				appData.DateOfReOpenRelevantRepresentationStart = dateBeforeYesterday;
			});
			describe('When the re-open close date is set to yesterday', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationClose = dateYesterday;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});

			describe('When the re-open close date is set to today', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationClose = dateToday;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('When the re-open close date is set to tomorrow', () => {
				let registrationOpen;

				beforeEach(() => {
					appData.DateOfReOpenRelevantRepresentationClose = dateTomorrow;
					registrationOpen = isRegistrationReOpened(caseRef, appData);
				});
				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});
		});
	});

	describe('#isRegistrationClosed', () => {
		describe('When the registration close date is set to null', () => {
			let registrationClosed;

			beforeEach(() => {
				appData.DateOfRelevantRepresentationClose = null;
				registrationClosed = isRegistrationClosed(appData);
			});
			it('should return false', () => {
				expect(registrationClosed).toEqual(false);
			});
		});

		describe('When the registration start date and close date have both ended', () => {
			let registrationClosed;

			beforeEach(() => {
				appData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
				appData.DateOfRelevantRepresentationClose = dateYesterday;
				registrationClosed = isRegistrationClosed(appData);
			});
			it('should return true', () => {
				expect(registrationClosed).toEqual(true);
			});
		});

		describe('When the registration re-open start date and re-open close date have both ended', () => {
			let registrationClosed;

			beforeEach(() => {
				appData.DateOfReOpenRelevantRepresentationStart = dateBeforeYesterday;
				appData.DateOfReOpenRelevantRepresentationClose = dateYesterday;
				registrationClosed = isRegistrationClosed(appData);
			});
			it('should return true', () => {
				expect(registrationClosed).toEqual(true);
			});
		});
	});
});
