module.exports = (table) => {
    const contents = table.hashes()
    for (var i=0;i<contents.length;i++) {
        cy.confirmTextOnPage(contents[i].Links);
    }
};