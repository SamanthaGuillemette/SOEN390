// FinalQA.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
/* ==== Test Created with Cypress Studio ==== */
it('QA Test', function() {
 /* ==== Generated with Cypress Studio ==== */
 cy.visit('http://localhost:3000/');
 cy.get('#email').clear();
 cy.get('#email').type('QA-Admin@gmail.com');
 cy.get('#password').clear();
 cy.get('#password').type('admin12345{enter}');
 cy.get('.MuiButton-root').click();
 cy.get('.UPCOMING-EVENTS-1__background > :nth-child(4) > .MuiButton-root').click({force: true});
 cy.get(':nth-child(7) > .MuiBackdrop-root').click({force: true});
 cy.get('.UPCOMING-EVENTS-2__background > :nth-child(4) > .MuiButton-root').click({force: true});
 cy.get(':nth-child(7) > .MuiBackdrop-root').click({force: true});
 cy.get('.COVID-NEWS__text').click({force: true});
 cy.get('[href="/"] > .MuiButtonBase-root').click();
 cy.get('.EVENT-BTN__text').click();
 cy.get('[href="/"] > .MuiButtonBase-root').click();
 cy.get('[href="/patients"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
 cy.get('body').click();
 /**
  * Bug here 
  */
 //cy.get('[data-value="-1"]').click();
 /* ==== End Cypress Studio ==== */
 /* ==== Generated with Cypress Studio ==== */
 cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
 cy.get('[href="/QR"] > .MuiButtonBase-root').click();
 cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
 cy.get('[href="/testing"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
 cy.get('[href="/inbox"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
 cy.get('.MuiGrid-grid-xs-4 > .MuiList-root').click();
 cy.get('[href="/"] > .MuiButtonBase-root').click();
 cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"]').click();
 cy.get('.MuiIconButton-edgeEnd').click({force: true});
 cy.get('#primary-search-account-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click({multiple:true});
 /* ==== End Cypress Studio ==== */
});
