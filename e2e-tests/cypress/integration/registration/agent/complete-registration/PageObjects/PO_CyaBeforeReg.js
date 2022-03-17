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
}
export default PO_CyaBeforeReg;