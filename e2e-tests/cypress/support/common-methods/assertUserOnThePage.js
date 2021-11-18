module.exports = (pageName) => {
    switch (pageName.toLowerCase()) {
        case "what type of interested party are you?":
            cy.title().should('eq', "Type of interested party - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What type of interested party are you?');
            })
            cy.url().should('include', '/register/type-of-party')
            break;
        case "what is your full name?":
            cy.title().should('eq', "Your full name - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What is your full name?');
            })
            cy.url().should('include', '/register/full-name')
            break;
        case "register to have your say":
            cy.title().should('eq', "Start registration");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Register to have your say');
            })
            cy.url().should('include', '/register/start')
            break;
        case "north lincolnshire green energy park project information":
            cy.title().should('eq', "North Lincolnshire Green Energy Park project information");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('North Lincolnshire Green Energy Park project information');
            })
            cy.url().should('include', '/overview/EN010116')
            break;
        case "having your say about a national infrastructure project":
            cy.title().should('eq', "Having your say about a national infrastructure project");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Having your say about a national infrastructure project');
            })
            cy.url().should('include', '/interested-party-guide')
            break;
        case "planning inspectorate":
            cy.url().should('include', '/before-you-apply');
            cy.title().should('eq', "Lorem Ipsum");
            break;
        case "crown copyright":
            cy.url().should('include', '/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/');
            cy.title().should('eq', "Crown copyright - The National Archives");
            break;
        case "feedback":
            cy.url().should('include', '/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUOFg4UFdEUThGTlU3S0hFUTlERVYwMVRLTy4u');
            cy.title().should('eq', "Give feedback about submitting your Planning Appeal (Beta)");
            break;
        case "having your say at the pre-application stage":
            cy.title().should('eq', "Having your say at the pre-application stage");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Having your say at the pre-application stage');
            })
            cy.url().should('include', '/interested-party-guide/have-say-pre-application')
            break;
        case "registering to have your say about a national infrastructure project":
            cy.title().should('eq', "Registering to have your say about a national infrastructure project");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Registering to have your say about a national infrastructure project');
            })
            cy.url().should('include', '/interested-party-guide/register-to-have-your-say')
            break;
        case "get involved in the preliminary meeting":
            cy.title().should('eq', "Get involved in the preliminary meeting");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Get involved in the preliminary meeting');
            })
            cy.url().should('include', '/interested-party-guide/get-involved-preliminary-meetings')
            break;
        case "have your say during the examination of the project":
            cy.title().should('eq', "Have your say during the examination of the project");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Have your say during the examination of the project');
            })
            cy.url().should('include', '/interested-party-guide/have-say-during-project-examination')
            break;
        case "what you can do after the decision has been made":
            cy.title().should('eq', "What you can do after the decision has been made");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What you can do after the decision has been made');
            })
            cy.url().should('include', '/interested-party-guide/after-making-the-decision')
            break;
        case "a404 dewsbury":
            cy.title().should('eq', "A404 Dewsbury");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('A404 Dewsbury');
            })
            cy.url().should('include', '/document-library/EN010116/1')
            break;
        default: throw console.error('uanble to find specified page name: ' + pageName);
    }
    cy.wait(Cypress.env('demoDelay'));
};