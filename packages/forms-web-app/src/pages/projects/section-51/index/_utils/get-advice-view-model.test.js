const { getAdviceViewModel } = require('./get-advice-view-model');
const { adviceList } = require('../../__mocks__/fixtures');
const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');
const section51Translations_EN = require('../../_translations/en.json');
const commonTranslations_CY = require('../../../../../locales/cy/common.json');
const section51Translations_CY = require('../../_translations/cy.json');

describe('pages/projects/section-51/index/_utils/get-advice-view-model', () => {
	describe('#getAdviceViewModel', () => {
		describe('When the advice given is a meeting in English', () => {
			const response = getAdviceViewModel(
				adviceList,
				'EN000001',
				mockI18n({
					common: commonTranslations_EN,
					section51: section51Translations_EN
				})
			);
			it('should return the meeting view model with the correct meeting text and non meeting text', () => {
				expect(response).toEqual([
					{
						adviceGivenBy: 'mock organisation',
						adviceTypeLabel: 'Enquiry from',
						enquiryDetail: 'mock enquiry detail',
						date: {
							date: '2023-01-01',
							text: 'Date advice given:'
						},
						link: '/projects/EN000001/s51advice/mock advice id 1',
						linkTitle: 'View advice to mock organisation'
					},
					{
						adviceGivenBy: 'mock organisation',
						adviceTypeLabel: 'Meeting with',
						enquiryDetail: 'mock enquiry detail 2',
						date: {
							date: 'mock date given 2',
							text: 'Date of meeting:'
						},
						link: '/projects/EN000001/s51advice/mock advice id 2',
						linkTitle: 'View meeting with mock organisation'
					},
					{
						adviceGivenBy: 'mock first name mock last name',
						adviceTypeLabel: 'Enquiry from',
						enquiryDetail: 'mock enquiry detail 3',
						date: {
							date: 'mock date given 3',
							text: 'Date advice given:'
						},
						link: '/projects/EN000001/s51advice/mock advice id 3',
						linkTitle: 'View advice to mock first name mock last name'
					},
					{
						adviceGivenBy: 'Anonymous',
						adviceTypeLabel: 'Enquiry from',
						enquiryDetail: 'mock enquiry detail 4',
						date: {
							date: 'mock date given 4',
							text: 'Date advice given:'
						},
						link: '/projects/EN000001/s51advice/mock advice id 4',
						linkTitle: 'View advice to Anonymous'
					}
				]);
			});
		});
		describe('When the advice given is a meeting in Welsh', () => {
			const response = getAdviceViewModel(
				adviceList,
				'CY000001',
				mockI18n(
					{
						common: commonTranslations_CY,
						section51: section51Translations_CY
					},
					'cy'
				)
			);
			it('should return the meeting view model with the correct meeting text and non meeting text', () => {
				expect(response).toEqual([
					{
						adviceGivenBy: 'mock organisation',
						adviceTypeLabel: 'Ymholiad gan',
						enquiryDetail: 'mock enquiry detail in Welsh',
						date: {
							date: '2023-01-01',
							text: 'Dyddiad y rhoddwyd y cyngor:'
						},
						link: '/projects/CY000001/s51advice/mock advice id 1',
						linkTitle: 'Gweld cyngor i mock organisation'
					},
					{
						adviceGivenBy: 'mock organisation',
						adviceTypeLabel: 'Cyfarfod â',
						enquiryDetail: 'mock enquiry detail 2 in Welsh',
						date: {
							date: 'mock date given 2',
							text: 'Dyddiad y cyfarfod:'
						},
						link: '/projects/CY000001/s51advice/mock advice id 2',
						linkTitle: 'Gweld cyfarfod gyda mock organisation'
					},
					{
						adviceGivenBy: 'mock first name mock last name',
						adviceTypeLabel: 'Ymholiad gan',
						enquiryDetail: 'mock enquiry detail 3 in Welsh',
						date: {
							date: 'mock date given 3',
							text: 'Dyddiad y rhoddwyd y cyngor:'
						},
						link: '/projects/CY000001/s51advice/mock advice id 3',
						linkTitle: 'Gweld cyngor i mock first name mock last name'
					},
					{
						adviceGivenBy: 'Dienw',
						adviceTypeLabel: 'Ymholiad gan',
						enquiryDetail: 'mock enquiry detail 4 in Welsh',
						date: {
							date: 'mock date given 4',
							text: 'Dyddiad y rhoddwyd y cyngor:'
						},
						link: '/projects/CY000001/s51advice/mock advice id 4',
						linkTitle: 'Gweld cyngor i Dienw'
					}
				]);
			});
		});
	});
});
