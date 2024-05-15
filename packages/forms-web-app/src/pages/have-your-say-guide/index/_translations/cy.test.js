const cyIndexTranslations = require('./cy.json');

describe('pages/have-your-say-guide/index/_translations/cy', () => {
	it('should return the welsh have your say guide index translations', () => {
		expect(cyIndexTranslations).toEqual({
			linkText1: 'Find a project and have your say',
			listItem1: 'ffermydd gwynt alltraeth',
			listItem2: 'gorsafoedd pŵer a llinellau trydan',
			listItem3: 'traffyrdd a phrif ffyrdd eraill',
			listItem4: 'rheilffyrdd',
			listItem5: 'piblinellau nwy',
			paragraph1:
				"Mae'r canllaw hwn ar gyfer unigolion a sefydliadau sydd eisiau lleisio'u barn am brosiect.",
			paragraph2:
				"Mae prosiectau seilwaith cenedlaethol yn cael eu galw'n Brosiectau Seilwaith o Arwyddocâd Cenedlaethol (NSIP) hefyd. Datblygiadau ar raddfa fawr yw'r rhain fel:",
			paragraph3:
				"Y broses ar gyfer prosiectau seilwaith cenedlaethol yw penderfynu a ellir rhoi Gorchymyn Caniatâd Datblygu (DCO). Dogfen gyfreithiol yw DCO sy'n caniatáu i ymgeisydd adeiladu ei brosiect arfaethedig. Mae'r ymgeisydd yn cyflwyno cais ar gyfer datblygiad arfaethedig i'r Arolygiaeth Gynllunio. Mae panel o arolygwyr annibynnol a elwir yn Awdurdod Archwilio yn edrych ar y prosiect ac yn dechrau archwilio'r cais. Maen nhw'n gwneud argymhelliad i'r Ysgrifennydd Gwladol perthnasol ynglŷn â ph'un a ddylai'r prosiect fynd ymlaen.",
			paragraph4:
				"Yn rhan o'r broses hon, gall unrhyw un leisio'i farn am y prosiect a dweud wrthym pam maen nhw'n credu y dylai fynd ymlaen neu beidio."
		});
	});
});
