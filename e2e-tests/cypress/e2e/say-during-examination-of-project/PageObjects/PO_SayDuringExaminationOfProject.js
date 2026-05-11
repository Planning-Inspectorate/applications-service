class PO_SayDuringExaminationOfProject {
	identifiers = {};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	assertLinksPresentOnPage(table) {
		table.hashes().forEach(({ Links }) => cy.confirmTextOnPage(Links));
	}
}
export default PO_SayDuringExaminationOfProject;
