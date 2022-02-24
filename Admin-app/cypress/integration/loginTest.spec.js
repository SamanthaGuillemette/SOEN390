/// <reference types="cypress" />

describe("Login flow testing", () => {
  it("first", () => {
    // Visit our app url
    cy.visit("/");


    // Wrong credentials
    cy.get("#email").type("abc@gmail.com");
    cy.get("#password").type("123456");
    cy.contains("Sign In").click();
    cy.wait(3000);
    cy.visit("/");

   

    // Get the email & password box, type in credentials
    cy.get("#email").type("admin.quangtran@gmail.com");
    cy.get("#password").type("123456");

    // Submit the form
    cy.contains("Sign In").click();

    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait(2000);

    // Goes to appointment page
    cy.get('div').contains("Appointments").click();
    cy.wait(2000);

    // Go back to dashboard
    cy.visit("/");
    cy.wait(2000);

    //Goes to inbox page
    cy.get('div').contains("Inbox").click();
    cy.wait(2000);

    //Finally back to dashboard
    cy.visit("/");
    cy.wait(2000);

    



    cy.pause();
  });
});
