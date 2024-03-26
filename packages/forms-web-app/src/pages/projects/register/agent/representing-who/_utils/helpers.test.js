const { isRepresentingWho } = require('./helpers');

describe('pages/projects/register/agent/representing-who/_utils/helpers', () => {
	describe('#isRepresentingWho', () => {
		describe('When the user has selected the representing family', () => {
			let representingWho;

			representingWho = isRepresentingWho('family');

			it('should return the representing who family value as true', () => {
				expect(representingWho).toEqual({ family: true, organisation: false, person: false });
			});
		});

		describe('When the user has selected the representing organisation', () => {
			let representingWho;

			representingWho = isRepresentingWho('organisation');

			it('should return the representing who organisation value as true', () => {
				expect(representingWho).toEqual({ family: false, organisation: true, person: false });
			});
		});

		describe('When the user has selected the representing person', () => {
			let representingWho;

			representingWho = isRepresentingWho('person');

			it('should return the representing who person value as true', () => {
				expect(representingWho).toEqual({ family: false, organisation: false, person: true });
			});
		});
	});
});
