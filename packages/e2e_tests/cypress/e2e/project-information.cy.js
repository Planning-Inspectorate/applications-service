import { BasePage } from '../pageObject/basePage';

const basePage = new BasePage();

describe('use can view and interact with the project informaiton page', () => {
	before(() => {
		cy.clearCookies();
		cy.navigateAndSearch('Front Office');
	});

	it('should verify the user is on the project information page', () => {
		cy.url().should('include', 'projects/BC0910150');
		basePage.locateH1ByText('Project information');
	});

	it('should verify a user is returned to the project information section', () => {
		basePage.clickProjectInformationMenuLink('have-your-say');
		cy.url().should('include', 'register-have-your-say');
		basePage.clickProjectInformationMenuLink('projects');
		basePage.locateH1ByText('Project information');
	});

	it('should verify about the project section exists', () => {
		basePage.locateH2ByText('About the project');
		basePage.visibleGovBody('Type of application');
		basePage.visibleGovBody('Name of applicant');
	});

	it('should verify the project stage section exists', () => {
		basePage.locateH2ByText('Project stage');
		basePage.visibleGovBody('This project is at');
		basePage.clickGovBtn('Register to have your say');
		cy.url().should('include', 'register-have-your-say');
		basePage.clickProjectInformationMenuLink('projects');
		cy.url().should('include', 'projects/BC0910150');
	});

	it('should verify the project location section exists', () => {
		basePage.locateH2ByText('Project location');
		basePage.visibleGovMap();
	});

	it('should verify the get updates section exists', () => {
		basePage.locateH2ByText('Get updates');
		basePage.visibleGovBody('Enter your email address to receive:');
		basePage.clickGovInset(
			'Read the privacy notice to see how we handle your information',
			'/customer-privacy-notice'
		);
		basePage.clickGovBtn('Get updates');
		cy.url().should('include', 'get-updates/start');
		basePage.clickProjectInformationMenuLink('projects');
		cy.url().should('include', 'projects/BC0910150');
	});

	it('should verify the contact us section exists', () => {
		basePage.locateH2ByText('Contact us');
		basePage.locateH3ByText('Telephone');
		basePage.visibleGovBody('Telephone: 0303 444 5000');
		basePage.locateH3ByText('Email');
		basePage.locateH3ByText('Alternative formats');
	});
});
