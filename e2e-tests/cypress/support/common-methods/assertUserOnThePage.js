module.exports = (pageName) => {
    switch (pageName.toLowerCase()) {
        case "who are you registering for?":
            cy.title().should('eq', "Type of interested party - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Who are you registering for?');
            })
            cy.url().should('include', '/register/type-of-party')
            break;
        case "what is your full name?":
            cy.title().should('eq', "Your full name - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What is your full name?');
            })
            cy.url().should('include', '/register/myself/full-name')
            break;
        case "register to have your say":
            cy.title().should('eq', "Start registration");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Register to have your say');
            })
            cy.url().should('include', '/register/start')
            break;
        case "north lincolnshire green energy park project information":
            cy.title().should('eq', "North Lincolnshire Green Energy Park project overview");
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
            cy.title().should('eq', "Getting involved or commenting on a project in your local area");
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
            cy.title().should('eq', "A303 Dewsbury project overview");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('A404 Dewsbury');
            })
            cy.url().should('include', '/document-library/EN010116/1')
            break;
        case "are you 18 or over?":
            cy.title().should('eq', "Are you 18 or over - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Are you 18 or over?');
            })
            cy.url().should('include', '/register/myself/over-18')
            break;
        case "uk address details":
            cy.title().should('eq', "UK address details - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('UK address details');
            })
            cy.url().should('include', '/register/myself/address')
            break;
        case "what is your email address?":
            cy.title().should('eq', "Email address - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What is your email address?');
            })
            cy.url().should('include', '/register/myself/email')
            break;
        case "what is your telephone number?":
            cy.title().should('eq', "Your telephone number - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What is your telephone number?');
            })
            cy.url().should('include', '/register/myself/telephone')
            break;
        case "what do you want to tell us about this proposed project?":
            cy.title().should('eq', "Comments - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('What do you want to tell us about this proposed project?');
            })
            cy.url().should('include', '/register/myself/comments')
            break;
        case "check your answers before registering":
            cy.title().should('eq', "Check your answers - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Check your answers before registering');
            })
            cy.url().should('include', '/register/myself/check-your-answers')
            break;
        case "declaration":
            cy.title().should('eq', "Declaration - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Declaration');
            })
            cy.url().should('include', '/register/myself/declaration')
            break;
        case "registration complete":
            cy.title().should('eq', "Confirmation - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Registration complete');
            })
            cy.url().should('include', '/register/myself/confirmation')
            break;
        case "do you want to add another comment?":
            cy.title().should('eq', "Add another comment - Register to have your say");
            cy.get('h1').invoke('text').then((text) => {
                expect(text).to.contain('Do you want to add another comment?');
            })
            cy.url().should('include', '/register/myself/add-another-comment')
            break;
        default: throw console.error('uanble to find specified page name: ' + pageName);
    }
    cy.wait(Cypress.env('demoDelay'));
};