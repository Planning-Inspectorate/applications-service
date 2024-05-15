const cyDetailedInformationTranslations = require('./cy.json');

describe('pages/detailed-information/_translations/cy', () => {
	it('should return the welsh detailed information page translations', () => {
		expect(cyDetailedInformationTranslations).toEqual({
			heading1: 'Gwybodaeth fanwl',
			linkParagraph1: "Gallwch weld y camau y mae cais yn mynd trwyddynt, o'r dechrau i'r diwedd.",
			linkParagraph2:
				'Dysgwch bopeth y mae angen i chi ei wybod am rannu eich safbwyntiau ar brosiect.',
			linkParagraph3:
				"Canllaw sy'n amlinellu'r broses ymgeisio gydag adnoddau ar gyflwyno cynnig cynllunio.",
			linkParagraph4: 'Gallwch weld Deddf Cynllunio 2008 i ddeall ein dyletswyddau cyfreithiol.',
			linkParagraph5:
				'Gallwch weld dogfennau ynglŷn â chyflwyno ceisiadau ar gyfer Prosiect Seilwaith o Arwyddocâd Cenedlaethol.',
			linkParagraph6:
				"Mae gan yr Arolygiaeth Gynllunio gyfres o nodiadau cyngor sy'n ymdrin ag ystod o fanylion proses.",
			linkParagraph7:
				"Dysgwch beth yw Datganiadau Polisi Cenedlaethol (NPSau), beth maen nhw'n ei gynnwys a sut maen nhw'n berthnasol i broses Deddf Cynllunio 2008.",
			linkParagraph8:
				'Gallwch weld yr holl gyngor a roddwyd gan yr Arolygiaeth Gynllunio ers 2008.',
			linkTitle1: 'Gweld y broses',
			linkTitle2: "Sut i leisio'ch barn am brosiect",
			linkTitle3: 'Canllaw i ymgeiswyr',
			linkTitle4: 'Gwybodaeth ddeddfwriaethol',
			linkTitle5: 'Gweld canllawiau',
			linkTitle6: 'Gweld nodiadau cyngor',
			linkTitle7: 'Datganiadau Polisi Cenedlaethol',
			linkTitle8: 'Cofrestr gyngor',
			paragraph1:
				"Dewch o hyd i ragor o ddeddfwriaeth ac adnoddau canllaw. Gallai'r wybodaeth ar y dudalen hon fod yn ddefnyddiol i'r rhai sy'n gwneud cais i ddefnyddio'r gwasanaeth ac i'r cyhoedd."
		});
	});
});
