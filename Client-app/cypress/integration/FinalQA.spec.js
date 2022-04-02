// FinalQA.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/**
 * @fileoverview This file contains the QA test for the client-app
 * @Author: Mohammad Ali Zahir
 */

/* ==== Test Created with Cypress Studio ==== */
/**
 * @param  {} 'QATest' name of the test
 * @param  {} function() name of the function
 */
it('QA Test', function() {
 /* ==== Generated with Cypress Studio ==== */
 /**
  * Accessing the localhost and logging in to the website
  */
 cy.visit('localhost:3001');
 cy.get('#email').clear();
 cy.get('#email').type('alizahirpsn@gmail.com');
 cy.get('#password').type('client12345{enter}');
 cy.get('.MuiButton-root').click();

 /**
  * Clicking to the appointment page
  */
 cy.get(':nth-child(1) > a > .dashboard-card__container > .dashboard-card__img').click();
 cy.get('.appointment-buttonContainer > .MuiButton-contained').click();
 cy.get('.MuiButton-outlined').click();
 cy.get('.css-4p6bx2-MuiButtonBase-root-MuiIconButton-root > a').click();
 cy.get(':nth-child(2) > a > .dashboard-card__container').click();

 /**
  * Clicking around to go back to the dashboard , and seeing how the diary works
  */
 cy.get('a > .BOTTOM-NAV__btn__title').click();
 cy.get(':nth-child(3) > a > .dashboard-card__container').click();
 cy.get(':nth-child(1) > :nth-child(1) > [sx="[object Object]"] > .MuiButtonBase-root > [data-testid="BookIcon"] > path').click({force: true});
 cy.get('.MuiDialogActions-root > .MuiButton-root').click({force: true});

 /**
  * Clicking around, and writing a message to the doctor
  */

 cy.get('[data-testid="HomeRoundedIcon"] > path').click();
 cy.get(':nth-child(4) > a > .dashboard-card__container').click();
 cy.get('#mui-1').clear();
 cy.get('#mui-1').type('I need a doctor');
 cy.get('.css-1c16yah-MuiGrid-root > .MuiButton-root').click();
 cy.get('.css-4p6bx2-MuiButtonBase-root-MuiIconButton-root > a').click();
 cy.get(':nth-child(5) > a > .dashboard-card__container > .dashboard-card__img').click();
 cy.get('a > .BOTTOM-NAV__btn__title').click();

 /**
  * Clicking around to find the button to update status
  */

 cy.get(':nth-child(7) > a > .dashboard-card__container > .dashboard-card__title').click();
 cy.get('.css-4p6bx2-MuiButtonBase-root-MuiIconButton-root > a').click();
 cy.get(':nth-child(8) > a > .dashboard-card__container > .dashboard-card__img').click();
 cy.get('[data-testid="AddCircleIcon"]').click();
 cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInput-root > #statusModal-standardBasic').clear({force: true});
 cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInput-root > #statusModal-standardBasic').clear();
 cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInput-root > #statusModal-standardBasic').type('40');
 cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInput-root > #statusModal-standardBasic').clear();
 cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInput-root > #statusModal-standardBasic').type('150');
 cy.get('.MuiBox-root > .MuiButton-root').click();


 /**
  * Accessing the profile and then editing it
  */

  cy.get('[data-testid="profile"]').click();
  cy.get('[data-testid="EditIcon"]').click();
  cy.get('#firstName').clear();
  cy.get('#firstName').type('Mohammad Ali');
  cy.get('.update-button').click();

 /**
  * Going to the notification screen and then finally logging out
  */
 cy.get('[data-testid="NotificationsIcon"]').click({force: true});
 cy.get('[data-testid="LogoutIcon"]').click();
 /* ==== End Cypress Studio ==== */
});
