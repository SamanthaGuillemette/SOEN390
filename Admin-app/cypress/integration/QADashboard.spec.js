// QADashboard.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/* ==== Test Created with Cypress Studio ==== */
it('Dashboard QA', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get('#email').click();
  cy.get('#root').click();
  cy.get('#email').click();
  cy.get('#email').clear();
  cy.get('#password').clear();
  cy.get('#root').click();
  cy.get('#email').clear();
  cy.get('#email').type('abc@gmail.com');
  cy.get('#password').clear();
  cy.get('#password').type('11222323');
  cy.get('.PrivateSwitchBase-input').check();
  cy.get('.MuiButton-root').click({force: true});
  cy.get('.MuiBackdrop-root').click({force:true});
  cy.get('#root').click();
  cy.get('#email').click();
  cy.get('#email').click();
  cy.get('#email').click();
  cy.get('#password').clear();
  cy.get('#email').clear();
  cy.get('#email').type('admin.quangtran@gmail.com');
  cy.get('#password').clear();
  cy.get('#password').type('123456');
  cy.get('.MuiButton-root').click();
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[data-testid="covid-1"] > a > .MuiButton-root > .content').click();
  cy.get('[data-testid="ChevronLeftIcon"]').click();
  cy.get('[data-testid="MenuIcon"]').click({force: true});
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('.outer-layer > :nth-child(4) > .MuiButton-root > [data-testid="ArrowForwardIcon"]').click({force: true});
  cy.get(':nth-child(7) > .MuiBackdrop-root').click({force: true});
  cy.get('.outer-layer-2 > :nth-child(4) > .MuiButton-root').click({force: true});
  cy.get(':nth-child(7) > .MuiBackdrop-root').click({force: true});
  cy.get('[href="/appointments"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('[href="/patients"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('[href="/inbox"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('.MuiButton-root').click({force: true});
  cy.get('[href="/testing"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('[href="/QR"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('[href="/"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click({force: true});
  cy.get('.MuiInputBase-input').click();
  cy.get('.css-1guk29 > [aria-label="show 4 new mails"]').click();
  cy.get('#primary-search-msg-menu > .MuiBackdrop-root').click();
  cy.get('.css-1guk29 > [aria-label="show 17 new notifications"] > .MuiBadge-root > [data-testid="NotificationsIcon"] > path').click();
  cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"]').click();
  cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"]').click({force: true});
  cy.get('#primary-search-account-menu > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click({force: true});
  cy.get('.MuiIconButton-edgeEnd > [data-testid="AccountCircleIcon"]').contains("Signout").click({force: true})
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */

  /* ==== End Cypress Studio ==== */
});

