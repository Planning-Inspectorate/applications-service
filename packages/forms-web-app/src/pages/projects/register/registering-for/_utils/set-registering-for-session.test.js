const { setRegisteringForSession } = require('./set-registering-for-session');

describe('pages/projects/register/registering-for/_utils/set-registering-for-session', () => {
	describe('#setRegisteringForSession', () => {
		describe('When setting the registering for session', () => {
			describe(`and the user has selected 'behalf'`, () => {
				const session = {};
				const selectedOption = 'behalf';

				beforeEach(() => {
					setRegisteringForSession(session, selectedOption);
				});

				it('should set the correct the correct data to the session', () => {
					expect(session).toEqual({
						behalfRegdata: {
							behalf: 'you',
							case_ref: null,
							representee: {
								address: { country: null, line1: null, line2: null, line3: null, postcode: null },
								email: null,
								'full-name': null,
								'over-18': null,
								telephone: null
							},
							representing: null,
							representor: {
								address: { country: null, line1: null, line2: null, line3: null, postcode: null },
								email: null,
								'full-name': null,
								'organisation-name': null,
								'over-18': null,
								telephone: null
							}
						},
						typeOfParty: 'behalf'
					});
				});
			});

			describe(`and the user has selected 'myself'`, () => {
				const session = {};
				const selectedOption = 'myself';

				beforeEach(() => {
					setRegisteringForSession(session, selectedOption);
				});

				it('should set the correct the correct data to the session', () => {
					expect(session).toEqual({
						mySelfRegdata: {
							address: { country: null, line1: null, line2: null, line3: null, postcode: null },
							behalf: 'me',
							case_ref: null,
							email: null,
							'full-name': null,
							'over-18': null,
							telephone: null
						},
						typeOfParty: 'myself'
					});
				});
			});

			describe(`and the user has selected 'organisation'`, () => {
				const session = {};
				const selectedOption = 'organisation';

				beforeEach(() => {
					setRegisteringForSession(session, selectedOption);
				});

				it('should set the correct the correct data to the session', () => {
					expect(session).toEqual({
						orgRegdata: {
							address: { country: null, line1: null, line2: null, line3: null, postcode: null },
							behalf: 'them',
							case_ref: null,
							email: null,
							'full-name': null,
							'organisation-name': null,
							'over-18': null,
							role: null,
							telephone: null
						},
						typeOfParty: 'organisation'
					});
				});
			});
		});
	});
});
