const { nsipProjectLink } = require('../../../src/lib/nsip-project-link');
const config = require('../../../src/config');

describe('lib/nsip-project-link', () => {
	it('should generate a link when a project name does not have special characters', () => {
		const projectData = {
			ProjectName: 'Longfield Solar Farm',
			Region: 'Eastern'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/eastern/longfield-solar-farm'
		);
	});
	it('should generate a link when a project name contains some welsh characters', () => {
		const projectData = {
			ProjectName: 'Awel y Môr Offshore Wind Farm',
			Region: 'Wales'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/wales/awel-y-mor-offshore-wind-farm'
		);
	});
	it('should generate a link when a project name contains a hyphen character', () => {
		const projectData = {
			ProjectName: 'North West Coast Connections Project - N Grid',
			Region: 'North West'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/north-west/north-west-coast-connections-project-n-grid'
		);
	});
	it('should generate a link when a project name contains parenthesis characters', () => {
		const projectData = {
			ProjectName: 'SP Mid Wales (Electricity) Connections Project (SP Manweb)',
			Region: 'Wales'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/wales/sp-mid-wales-electricity-connections-project-sp-manweb'
		);
	});
	it('should generate a link when a project name contains forward slash characters', () => {
		const projectData = {
			ProjectName: 'M60/M62/M66 Simister Island',
			Region: 'North West'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/north-west/m60-m62-m66-simister-island'
		);
	});
	it('should generate a link when a project name contains a single apostraphe slash character', () => {
		const projectData = {
			ProjectName: "Someone's Ficticious Project",
			Region: 'North West'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/north-west/someones-ficticious-project'
		);
	});
	it('should generate a link when a project name contains an ampersand character', () => {
		const projectData = {
			ProjectName: 'Oikos Marine & South Side Development',
			Region: 'North West'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/north-west/oikos-marine-south-side-development'
		);
	});
	it('should generate a link when a project name contains all known special characters', () => {
		const projectData = {
			ProjectName: "Oikos Marine (OM) South-West/South Side Development - Her Majesty's Order",
			Region: 'South East'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://infrastructure.planninginspectorate.gov.uk/projects/south-east/oikos-marine-om-south-west-south-side-development-her-majestys-order'
		);
	});
	it('should generate a link when the NSIP base URL config is overridden', () => {
		config.server.nsipBaseUrl = 'https://somethingelse.planninginspectorate.gov.uk';
		const projectData = {
			ProjectName: 'Longfield Solar Farm',
			Region: 'Eastern'
		};
		const projectLink = nsipProjectLink(projectData);
		expect(projectLink).toBe(
			'https://somethingelse.planninginspectorate.gov.uk/projects/eastern/longfield-solar-farm'
		);
	});
});
