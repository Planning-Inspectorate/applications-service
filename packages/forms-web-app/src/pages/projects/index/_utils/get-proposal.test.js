const { getProposal } = require('./get-proposal');

const { mockI18n } = require('../../../_mocks/i18n');

const projectsIndexTranslation_EN = require('../_translations/en.json');
const projectsIndexTranslation_CY = require('../_translations/cy.json');

describe('pages/projects/index/_utils/get-proposal', () => {
	describe('#getProposal', () => {
		describe('When getting the translated proposal', () => {
			describe('and the locale is set to en', () => {
				const i18n = mockI18n({ projectsIndex: projectsIndexTranslation_EN });
				it('should return the proposal in english', () => {
					expect(getProposal(i18n, 'BC01 - Office use')).toEqual('Office use');
					expect(
						getProposal(i18n, 'BC02 - Research and Development of Products or Processes')
					).toEqual('Research and Development of Products or Processes');
					expect(getProposal(i18n, 'BC03 - An Industrial Process or Processes')).toEqual(
						'An Industrial Process or Processes'
					);
					expect(getProposal(i18n, 'BC04 - Storage or Distribution of Goods')).toEqual(
						'Storage or Distribution of Goods'
					);
					expect(getProposal(i18n, 'BC05 - Conferences')).toEqual('Conferences');
					expect(getProposal(i18n, 'BC06 - Exhibitions')).toEqual('Exhibitions');
					expect(getProposal(i18n, 'BC07 - Sport')).toEqual('Sport');
					expect(getProposal(i18n, 'BC08 - Leisure')).toEqual('Leisure');
					expect(getProposal(i18n, 'BC09 - Tourism')).toEqual('Tourism');
					expect(getProposal(i18n, 'EN01 - Generating Stations')).toEqual('Generating Stations');
					expect(getProposal(i18n, 'EN02 - Electric Lines')).toEqual('Electric Lines');
					expect(getProposal(i18n, 'EN03 - Underground Gas Storage Facilities')).toEqual(
						'Underground Gas Storage Facilities'
					);
					expect(getProposal(i18n, 'EN04 - LNG Facilities')).toEqual('LNG Facilities');
					expect(getProposal(i18n, 'EN05 - Gas Reception Facilities')).toEqual(
						'Gas Reception Facilities'
					);
					expect(getProposal(i18n, 'EN06 - Gas Transporter Pipe-lines')).toEqual(
						'Gas Transporter Pipe-lines'
					);
					expect(getProposal(i18n, 'EN07 - Other Pipe-lines')).toEqual('Other Pipe-lines');
					expect(getProposal(i18n, 'TR01 - Highways')).toEqual('Highways');
					expect(getProposal(i18n, 'TR02 - Airports')).toEqual('Airports');
					expect(getProposal(i18n, 'TR03 - Harbour Facilities')).toEqual('Harbour Facilities');
					expect(getProposal(i18n, 'TR04 - Railways')).toEqual('Railways');
					expect(getProposal(i18n, 'TR05 - Rail Freight Interchanges')).toEqual(
						'Rail Freight Interchanges'
					);
					expect(getProposal(i18n, 'WS01 - Hazardous Waste Facilities')).toEqual(
						'Hazardous Waste Facilities'
					);
					expect(getProposal(i18n, 'WW01 - Waste Water treatment Plants')).toEqual(
						'Waste Water treatment Plants'
					);
					expect(getProposal(i18n, 'WA01 - Dams and Reservoirs')).toEqual('Dams and Reservoirs');
					expect(getProposal(i18n, 'WA02 - Transfer of Water Resources')).toEqual(
						'Transfer of Water Resources'
					);
				});
			});

			describe('and the locale is set to cy', () => {
				const i18n = mockI18n({ projectsIndex: projectsIndexTranslation_CY });
				it('should return the proposal in welsh', () => {
					expect(getProposal(i18n, 'BC01 - Office use')).toEqual('At Ddefnydd Swyddfa');
					expect(
						getProposal(i18n, 'BC02 - Research and Development of Products or Processes')
					).toEqual('Ymchwil a Datblygiad Cynnyrch neu Brosesau');
					expect(getProposal(i18n, 'BC03 - An Industrial Process or Processes')).toEqual(
						'Proses neu Brosesau Diwydiannol'
					);
					expect(getProposal(i18n, 'BC04 - Storage or Distribution of Goods')).toEqual(
						'Storio neu Ddosbarthu Nwyddau'
					);
					expect(getProposal(i18n, 'BC05 - Conferences')).toEqual('Cynadleddau');
					expect(getProposal(i18n, 'BC06 - Exhibitions')).toEqual('Arddangosfeydd');
					expect(getProposal(i18n, 'BC07 - Sport')).toEqual('Chwaraeon');
					expect(getProposal(i18n, 'BC08 - Leisure')).toEqual('Hamdden');
					expect(getProposal(i18n, 'BC09 - Tourism')).toEqual('Twristiaeth');
					expect(getProposal(i18n, 'EN01 - Generating Stations')).toEqual('Gorsafoedd Cynhyrchu');
					expect(getProposal(i18n, 'EN02 - Electric Lines')).toEqual('Llinellau Trydan');
					expect(getProposal(i18n, 'EN03 - Underground Gas Storage Facilities')).toEqual(
						'Cyfleusterau Storio Nwy Tanddaearol'
					);
					expect(getProposal(i18n, 'EN04 - LNG Facilities')).toEqual(
						'Cyfleusterau Nwy Naturiol Hylifol (LNG)'
					);
					expect(getProposal(i18n, 'EN05 - Gas Reception Facilities')).toEqual(
						'Cyfleusterau Derbyn Nwy'
					);
					expect(getProposal(i18n, 'EN06 - Gas Transporter Pipe-lines')).toEqual(
						'Piblinellau Trawsgludo Nwy'
					);
					expect(getProposal(i18n, 'EN07 - Other Pipe-lines')).toEqual('Piblinellau Eraill');
					expect(getProposal(i18n, 'TR01 - Highways')).toEqual('Priffyrdd');
					expect(getProposal(i18n, 'TR02 - Airports')).toEqual('Meysydd Awyr');
					expect(getProposal(i18n, 'TR03 - Harbour Facilities')).toEqual('Cyfleusterau Harbwr');
					expect(getProposal(i18n, 'TR04 - Railways')).toEqual('Rheilffyrdd');
					expect(getProposal(i18n, 'TR05 - Rail Freight Interchanges')).toEqual(
						'Cyfnewidfeydd Rheilffyrdd Cludo Nwyddau'
					);
					expect(getProposal(i18n, 'WS01 - Hazardous Waste Facilities')).toEqual(
						'Cyfleusterau Gwastraff Peryglus'
					);
					expect(getProposal(i18n, 'WW01 - Waste Water treatment Plants')).toEqual(
						'Gweithfeydd Trin Dŵr Gwastraff'
					);
					expect(getProposal(i18n, 'WA01 - Dams and Reservoirs')).toEqual(
						'Argaeau a Chronfeydd Dŵr'
					);
					expect(getProposal(i18n, 'WA02 - Transfer of Water Resources')).toEqual(
						'Trosglwyddo Adnoddau Dŵr'
					);
				});
			});
		});
	});
});
