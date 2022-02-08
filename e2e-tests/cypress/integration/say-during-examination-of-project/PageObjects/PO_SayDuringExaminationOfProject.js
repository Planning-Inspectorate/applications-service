class PO_SayDuringExaminationOfProject {

    assertLinksPresentOnPage(table) {
        const contents = table.hashes()
        cy.confirmTextOnPage(contents[0].Links);
        cy.confirmTextOnPage(contents[1].Links);
        cy.confirmTextOnPage(contents[2].Links);
        cy.confirmTextOnPage(contents[3].Links);
    }

}
export default PO_SayDuringExaminationOfProject;