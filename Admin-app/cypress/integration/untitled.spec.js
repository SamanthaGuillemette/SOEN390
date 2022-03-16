// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('Sample test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#email').clear();
  cy.get('#email').type('ali_4z@hotmail.com');
  cy.get('#password').clear();
  cy.get('#password').type('Admin123{enter}');
  cy.get('.MuiButton-root').click();
  cy.get('[href="/testing"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[href="/inbox"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('#mui-1').clear();
  cy.get('#mui-1').type('I need a doctor');
  cy.get('.MuiButton-root').click();
  cy.get('[href="/patients"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[tabindex="0"] > [data-testid="KeyboardArrowRightIcon"]').click();
  cy.get('[href="/appointments"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemIcon-root').click();
  cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"] > path').click();
  cy.get('#primary-search-account-menu > .MuiBackdrop-root').click();
  cy.get('.event-button-div > a > .MuiButton-root > .content').click();
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[data-testid="covid-1"] > a > .MuiButton-root > .content').click();
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"] > path').click();
  cy.get('[style="color: var(--text-primary);"]').contains("Signout").click();
  /* ==== End Cypress Studio ==== */
});
