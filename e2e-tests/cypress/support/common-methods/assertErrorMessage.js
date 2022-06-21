module.exports = (table) => {
	cy.title().should('include', 'Error: ');
	const expectedErrorMsg = table.hashes();
	for (let index = 0; index < expectedErrorMsg.length; index++) {
		cy.confirmTextOnPage(expectedErrorMsg[index].ErrorMsg);
	}
};
