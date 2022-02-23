/// <reference types="cypress" />

describe("Login flow testing", () => {
  it("first", () => {
    // Visit our app url
    cy.visit("/");

    // Get the email & password box, type in credentials
    cy.get("#email").type("admin.quangtran@gmail.com");
    cy.get("#password").type("123456");

    // Submit the form
    cy.contains("Sign In").click();

    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait(1000);

    // Sign out from Dashboard
    // cy.get("[aria-label='account of current user']").click();

    // cy.contains('[role="menuitem"]', "Sign Out").click();

    cy.pause();
  });
});
