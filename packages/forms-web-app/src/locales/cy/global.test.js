const cyGlobalTranslations = require('./global.json');

describe('locales/cy/global', () => {
	it('should return the welsh global translations', () => {
		expect(cyGlobalTranslations).toEqual({
			betaBanner: {
				content: "Gwasanaeth beta yw hwn - bydd eich {{-link}} yn ein helpu i'w wella.",
				feedback: 'adborth'
			},
			footer: {
				content: "Mae'r holl gynnwys ar gael o dan {{-link}}, ac eithrio lle nodir yn wahanol",
				contentLinkText: 'Drwydded Llywodraeth Agored v3.0',
				copyright: 'Hawlfraint y Goron',
				links: {
					accessibility: 'Datganiad hygyrchedd',
					contact: 'Cysylltu â ni',
					cookies: 'Cwcis',
					privacy: 'Preifatrwydd',
					't&c': 'Telerau ac amodau'
				}
			},
			headerTitle: {
				default: 'Dod o hyd i Brosiect Seilwaith Cenedlaethol',
				examination: "Lleisio'ch barn am gais",
				getUpdates: "Cael diweddariadau ynglŷn â'r prosiect hwn",
				register: "Cofrestru i leisio'ch barn"
			},
			primaryNavigation: {
				detailedInformation: 'Gwybodaeth fanwl',
				home: 'Hafan',
				projectSearch: 'Pob prosiect'
			}
		});
	});
});
