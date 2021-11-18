module.exports = (contentLink) => {
    cy.get('ul > li > a').each(($e1, index) => {
        const text = $e1.text();
        if(text.includes(contentLink)){
            cy.get('ul > li > a').eq(index).click(); 
        }
    })
  };