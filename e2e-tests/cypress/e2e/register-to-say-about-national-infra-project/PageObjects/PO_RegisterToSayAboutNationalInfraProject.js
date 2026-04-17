class PO_RegisterToSayAboutNationalInfraProject {
	assertLinksPresentOnPage(table) {
		const contents = table.hashes();
		contents.forEach((row) => {
			cy.confirmTextOnPage(row.Links);
		});
	}
}
export default PO_RegisterToSayAboutNationalInfraProject;
