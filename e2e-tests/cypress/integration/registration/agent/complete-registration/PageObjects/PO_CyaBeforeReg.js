class PO_CyaBeforeReg {

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
        switch (linkType) {
            case "Who are you registering for?":
                cy.get('[data-cy="registering-for"]').first().click();
                break;
            case "Full name":
                cy.get('[data-cy="full-name"]').last().click();
                break;
            case "Organisation name":
                cy.get('[data-cy="organisation-name"]').last().click();
                break;
            case "Who are you representing":
                cy.get('[data-cy="representing"]').last().click();
                break;
        }
    }
}
export default PO_CyaBeforeReg;