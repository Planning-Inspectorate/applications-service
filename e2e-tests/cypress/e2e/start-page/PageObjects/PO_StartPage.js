import PageObject from '../../PageObject';

class PO_StartPage extends PageObject {
	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const value = this[prop];
					if (typeof value !== 'function') {
						throw new Error(`Function "${String(prop)}" was not found on ${this.constructor.name}`);
					}
					return value.bind(this);
				}
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
