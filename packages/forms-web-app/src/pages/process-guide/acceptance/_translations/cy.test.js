const cyAcceptanceTranslations = require('./cy.json');

describe('pages/process-guide/acceptance/_translations/cy', () => {
	it('should return the welsh process guide acceptance page translations', () => {
		expect(cyAcceptanceTranslations).toEqual({
			heading2: 'Y cam derbyn',
			heading3: 'Yr hyn rydym yn ei ystyried yn ystod y cam derbyn',
			listItem1: "rydym yn derbyn y cais i'w archwilio",
			listItem2: 'nid ydym yn derbyn y cais',
			listItem3: "mae'r ymgeisydd yn tynnu ei gais yn ôl",
			paragraph1:
				"Mae'r ymgeisydd yn anfon ei gais atom yn ystod y cam hwn. Mae'n rhaid i'r cais gynnwys yr holl ddogfennau sy'n ofynnol, fel yr amlinellir mewn deddfwriaeth, yn ogystal â manylion yr ymgynghoriad y mae'r ymgeisydd wedi'i gynnal yn ystod y cam cyn-ymgeisio. Rydym yn edrych ar y dogfennau i wirio a allwn dderbyn y cais i'w archwilio. Mae gennym 28 niwrnod i wneud y penderfyniad hwn.",
			paragraph2: 'Mae un o 3 chanlyniad yn bosibl yn ystod y cam hwn:',
			paragraph3: "Os derbynnir y cais, bydd yn symud ymlaen i'r cam cyn-archwilio.",
			paragraph4:
				"Byddwn yn gwirio'r cais i wneud yn siŵr bod yr ymgeisydd wedi cyflwyno'r holl ddogfennau sy'n ofynnol yn ôl y gyfraith a bod y dogfennau hynny o safon foddhaol i archwilio'r cais.",
			paragraph5:
				"Os oes unrhyw beth ar goll neu os oes arnom angen mwy o wybodaeth, efallai na fyddwn yn gallu derbyn y cais i'w archwilio."
		});
	});
});
