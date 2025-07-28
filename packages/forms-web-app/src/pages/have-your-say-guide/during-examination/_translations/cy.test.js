const cyDuringExaminationTranslations = require('./cy.json');

describe('pages/have-your-say-guide/during-examination/_translations/cy', () => {
	it('should return the welsh have your say guide during examination translations', () => {
		expect(cyDuringExaminationTranslations).toEqual({
			heading2: 'Yr hyn y mae archwiliad yn ei olygu',
			paragraph1:
				"Y cam archwilio yw pan fydd yr Awdurdod Archwilio'n edrych ar y prosiect arfaethedig ac yn gofyn cwestiynau.",
			paragraph2:
				"Gall yr ymgeisydd, unrhyw un sydd wedi cofrestru i leisio'i farn, ac unrhyw un arall sy'n ymwneud â'r prosiect wneud sylwadau ar y datblygiad arfaethedig neu ateb unrhyw un o'r cwestiynau erbyn pob terfyn amser.",
			paragraph3:
				"Gwneir hyn yn ysgrifenedig fel arfer. Bydd yr Awdurdod Archwilio'n creu ac yn cyhoeddi dogfen sy'n cynnwys ei gwestiynau. Gallai'r archwiliad gynnwys gwrandawiadau hefyd os oes materion y mae angen eu trafod yn fanylach.",
			paragraph4:
				"Bydd yr Awdurdod Archwilio'n anfon amserlen atoch sy'n cynnwys dyddiadau pob terfyn amser ar gyfer anfon eich sylwadau. Bydd yr holl sylwadau'n cael eu cyhoeddi ar y dudalen gwybodaeth am y prosiect ar y wefan hon ar ôl iddynt gael eu derbyn.",
			heading3: 'Sut i wneud sylwadau yn ystod archwiliad',
			paragraph5:
				"Bydd holl ddogfennau'r prosiect, yr holl sylwadau gan bobl eraill sydd wedi cofrestru neu sydd â hawl statudol, a holl gwestiynau'r archwiliad yn cael eu cyhoeddi ar y dudalen gwybodaeth am y prosiect ar y wefan hon.",
			paragraph6:
				"Gallwch weld y dogfennau hyn a gwneud sylwadau trwy lenwi'r ffurflen ar-lein ar y dudalen gwybodaeth am y prosiect ar y wefan hon.",
			paragraph7:
				"Os ydych yn cael trafferth defnyddio gwasanaethau ar-lein, gallwch anfon gwybodaeth atom drwy e-bost neu'r post hefyd. Gallwch wirio'r wybodaeth am y prosiect yn adran y prosiect ar y wefan hon i ddod o hyd i fanylion cyswllt ar gyfer tîm achos yr Arolygiaeth Gynllunio.",
			paragraph8:
				"Bydd eich enw a'ch sylwadau'n cael eu cyhoeddi ochr yn ochr â'r dogfennau eraill yn adran y prosiect ar y wefan hon. Bydd eich cyfeiriad post, eich cyfeiriad e-bost a'ch rhif ffôn yn cael eu cadw'n breifat. {{-link}}.",
			paragraph8LinkText:
				"Gallwch ddarllen ein hysbysiad preifatrwydd i gael rhagor o wybodaeth (sy'n agor mewn tab newydd)",
			heading4: "Os ydych wedi methu'r dyddiad cau i gofrestru i leisio'ch barn",
			paragraph9:
				"Gallwch edrych ar y wybodaeth am y prosiect o hyd. Os byddwch yn cyflwyno gwybodaeth yn ystod y cam hwn, nid oes sicrwydd y bydd eich safbwyntiau'n cael eu cynnwys yn yr archwiliad o'r cais. Bydd yr Awdurdod Archwilio'n penderfynu p'un a ellir ystyried eich safbwyntiau.",
			heading5: 'Cyngor manylach',
			paragraph10:
				'Os oes arnoch angen cyngor manylach, gallwch gyfeirio at ein tudalennau cyngor i gael rhagor o wybodaeth.',
			linkText1: "Darllenwch y gyfres lawn o tudalennau cyngor (sy'n agor mewn tab newydd)"
		});
	});
});
