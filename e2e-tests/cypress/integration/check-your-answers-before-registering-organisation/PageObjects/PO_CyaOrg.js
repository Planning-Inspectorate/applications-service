class PO_CyaOrg {

    assertDataOnPage(table) {
        const data = table.hashes()
        for (let index = 0; index < data.length; index++) {
            cy.get('.govuk-summary-list__key').eq(index).should(($div) => {
                const text = $div.text().replace('kr', '').replace('\xa0', '').trim()
                expect(text).to.include(data[index].Column1)
              })
        }
        for (let index = 0; index < data.length; index++) {
            cy.get('.govuk-summary-list__value').eq(index).should(($div) => {
                const text = $div.text().replace('kr', '').replace('\xa0', '').trim()
                expect(text).to.include(data[index].Column2)
              })
        }
        for (let index = 0; index < data.length; index++) {
            cy.get('.govuk-summary-list__actions').eq(index).should(($div) => {
                const text = $div.text().replace('kr', '').replace('\xa0', '').trim()
                expect(text).to.include(data[index].Column3)
              })
        }
    }

    clickOnChangeLink(linkType) {
        switch(linkType) {
            case "Who are you registering for?": 
            cy.get('[data-cy="who-are-you"]').first().click();
            break;
            case "Full name": 
            cy.get('[data-cy="full-name"]').last().click();
            break;
            case "Are you 18 or over?": 
            cy.get('[data-cy="over-18"]').last().click();
            break;
            case "Address": 
            cy.get('[data-cy="address"]').last().click();
            break;
            case "Email address": 
            cy.get('[data-cy="email"]').last().click();
            break;
            case "Telephone number": 
            cy.get('[data-cy="telephone"]').last().click();
            break;
            case "Your comments change": 
            cy.get('[data-cy="comments"]').last().click();
            break;
        }
    }

}
export default PO_CyaOrg;