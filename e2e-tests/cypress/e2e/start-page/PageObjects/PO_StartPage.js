import PageObject from '../../PageObject';

class PO_StartPage extends PageObject {
	identifiers = {};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	openRegisterToHaveYourSayPage(projectName) {
		cy.visit('/project-search');
		this.clickProjectLink(projectName);
		this.clickLinkByHref('register/register-have-your-say');
	}

	clickStartNow() {
		this.clickLinkByHref('who-registering-for');
	}
}
export default PO_StartPage;
