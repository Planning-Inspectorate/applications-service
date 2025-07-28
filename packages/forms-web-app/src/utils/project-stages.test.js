const {
	documentProjectStages,
	projectStages,
	projectStagesTranslations,
	projectInfoProjectStages,
	registerOfApplicationsStages,
	materialChangeProjectStages
} = require('./project-stages');

describe('utils/project-stages', () => {
	describe('#documentProjectStages', () => {
		it('should return the document project stages', () => {
			expect(documentProjectStages).toEqual({
				1: { name: 'Pre-application', value: '1' },
				2: { name: 'Acceptance', value: '2' },
				3: { name: 'Pre-examination', value: '3' },
				4: { name: 'Examination', value: '4' },
				5: { name: 'Recommendation and decision', value: '5' },
				6: { name: 'Decided', value: '7' }
			});
		});
	});

	describe('#projectStages', () => {
		it('should return the project stages', () => {
			expect(projectStages).toEqual({
				1: 'Pre-application',
				2: 'Acceptance',
				3: 'Pre-examination',
				4: 'Examination',
				5: 'Recommendation',
				6: 'Decision',
				7: 'Decided',
				8: 'Withdrawn'
			});
		});
	});

	describe('#projectStagesTranslations', () => {
		it('should return the project stages translations', () => {
			expect(projectStagesTranslations).toEqual({
				1: { cy: 'Cyn-ymgeisio', en: 'Pre-application' },
				2: {
					cy: `Derbyn`,
					en: 'Acceptance'
				},
				3: { cy: 'Cyn-archwiliad', en: 'Pre-examination' },
				4: { cy: 'Archwiliad', en: 'Examination' },
				5: { cy: 'Argymhelliad', en: 'Recommendation' },
				6: { cy: 'Penderfyniad', en: 'Decision' },
				7: { cy: 'Wedi penderfynu', en: 'Decided' },
				8: { cy: "Wedi'i dynnu'n ôl", en: 'Withdrawn' }
			});
		});
	});

	describe('#projectInfoProjectStages', () => {
		it('should return the project info project stages', () => {
			expect(projectInfoProjectStages).toEqual({
				1: 'Pre-application',
				2: 'Acceptance',
				3: 'Pre-examination',
				4: 'Examination',
				5: 'Recommendation',
				6: 'Decision',
				7: 'Post-decision',
				8: 'Withdrawn'
			});
		});
	});

	describe('#materialChangeProjectStages', () => {
		it('should return the material change project stages', () => {
			expect(materialChangeProjectStages).toEqual({
				1: 'Pre-application',
				2: 'Application received',
				3: 'Application published',
				4: 'Examination',
				5: 'Recommendation',
				6: 'Decision',
				7: 'What happens after the decision is made',
				8: 'Withdrawn'
			});
		});
	});

	describe('#registerOfApplicationsStages', () => {
		it('should return the register of applications stages', () => {
			expect(registerOfApplicationsStages).toEqual([
				'acceptance',
				'pre_examination',
				'examination',
				'recommendation',
				'decision',
				'post_decision',
				'withdrawn'
			]);
		});
	});
});
