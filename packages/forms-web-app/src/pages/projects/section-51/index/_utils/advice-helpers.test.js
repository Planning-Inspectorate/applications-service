const { getProjectName } = require('./advice-helpers');
const { mockI18n } = require('../../../../_mocks/i18n');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');
const registerOfAdviceTranslations_EN = require('../../../../register-of-advice/index/_translations/en.json');
const registerOfAdviceTranslations_CY = require('../../../../register-of-advice/index/_translations/cy.json');

jest.mock('../../../../_utils/is-lang-welsh', () => ({
	isLangWelsh: jest.fn()
}));

const generalAdviceCaseRef = 'GS5110001';

describe('pages/projects/section-51/index/_utils/advice-helpers', () => {
	describe('#getProjectName', () => {
		describe('When the advice has the general advice case reference and English language is selected', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(false);
			});

			const advice = {
				adviceID: 'mock advice id 1',
				caseReference: generalAdviceCaseRef,
				projectName: '',
				projectNameWelsh: ''
			};

			it('should return the general title in English', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_EN
					})
				);
				expect(response).toEqual('General Section 51 Advice');
			});
		});

		describe('When the advice has the general advice case reference and the Welsh language is selected', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(true);
			});

			const advice = {
				adviceID: 'mock advice id 2',
				caseReference: generalAdviceCaseRef,
				projectName: '',
				projectNameWelsh: ''
			};

			it('should return the general title in Welsh', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_CY
					})
				);
				expect(response).toEqual('Cyngor Cyffredinol Adran 51');
			});
		});

		describe('When the advice has a project specific case reference, Welsh language is selected and a Welsh project name has been returned from the database', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(true);
			});

			const advice = {
				adviceID: 'mock advice id 3',
				caseReference: 'mock project case reference',
				projectName: 'English project name',
				projectNameWelsh: 'Welsh project name'
			};

			it('should return the Welsh project name', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_CY
					})
				);
				expect(response).toEqual('Welsh project name');
			});
		});

		describe('When the advice has a project specific case reference, Welsh language is selected and no Welsh project name has been returned from the database', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(true);
			});

			const advice = {
				adviceID: 'mock advice id 4',
				caseReference: 'mock project case reference',
				projectName: 'English project name',
				projectNameWelsh: ''
			};

			it('should return the English project name', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_CY
					})
				);
				expect(response).toEqual('English project name');
			});
		});

		describe('When the advice has a project specific case reference, English language is selected and an English project name has been returned from the database', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(false);
			});

			const advice = {
				adviceID: 'mock advice id 5',
				caseReference: 'mock project case reference',
				projectName: 'English project name',
				projectNameWelsh: 'Welsh project name'
			};

			it('should return the English project name', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_EN
					})
				);
				expect(response).toEqual('English project name');
			});
		});

		describe('When the advice has a project specific case reference, English language is selected and no English project name has been returned from the database', () => {
			beforeEach(() => {
				isLangWelsh.mockReturnValue(false);
			});

			const advice = {
				adviceID: 'mock advice id 6',
				caseReference: 'mock project case reference',
				projectName: '',
				projectNameWelsh: ''
			};

			it('should return an empty string', () => {
				const response = getProjectName(
					advice,
					mockI18n({
						registerOfAdvice: registerOfAdviceTranslations_EN
					})
				);
				expect(response).toEqual('');
			});
		});
	});
});
