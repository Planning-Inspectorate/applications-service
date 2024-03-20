const { isRegisteringFor, isSelectedRegisteringForOptionNew } = require('./helpers');

describe('pages/projects/register/registering-for/_utils/helpers', () => {
	describe('#isRegisteringFor', () => {
		describe(`When the user has selected the registering for 'behalf' option`, () => {
			let registeringFor;
			const selectedRegisteringForOption = 'behalf';

			beforeEach(() => {
				registeringFor = isRegisteringFor(selectedRegisteringForOption);
			});

			it('should return the register for agent value as true', () => {
				expect(registeringFor).toEqual({ agent: true, myself: false, organisation: false });
			});
		});

		describe(`When the user has selected the registering for 'myself' option`, () => {
			let registeringFor;
			const selectedRegisteringForOption = 'myself';

			beforeEach(() => {
				registeringFor = isRegisteringFor(selectedRegisteringForOption);
			});

			it('should return the register for myself value as true', () => {
				expect(registeringFor).toEqual({ agent: false, myself: true, organisation: false });
			});
		});

		describe(`When the user has selected the registering for 'organisation' option`, () => {
			let registeringFor;
			const selectedRegisteringForOption = 'organisation';

			beforeEach(() => {
				registeringFor = isRegisteringFor(selectedRegisteringForOption);
			});

			it('should return the register for organisation value as true', () => {
				expect(registeringFor).toEqual({ agent: false, myself: false, organisation: true });
			});
		});
	});

	describe('#isSelectedRegisteringForOptionNew', () => {
		describe('When the user has selected a registering for option', () => {
			describe('and the selected registering for option is the same as the previously selected option', () => {
				const selectedRegisteringForOption = 'mock previous option';
				const previouslySelectedRegisteringForOption = 'mock previous option';
				it('should return false', () => {
					expect(
						isSelectedRegisteringForOptionNew(
							selectedRegisteringForOption,
							previouslySelectedRegisteringForOption
						)
					).toEqual(false);
				});
			});

			describe('and the selected registering for option is NOT the same as the previously selected option', () => {
				const selectedRegisteringForOption = 'mock new option';
				const previouslySelectedRegisteringForOption = 'mock previous option';
				it('should return true', () => {
					expect(
						isSelectedRegisteringForOptionNew(
							selectedRegisteringForOption,
							previouslySelectedRegisteringForOption
						)
					).toEqual(true);
				});
			});
		});
	});
});
