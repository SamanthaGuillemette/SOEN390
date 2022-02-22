/// <reference types="cypress" />

describe("Dashboard page testing", () => {
    it("first", () =>{
        cy.visit('/');

        // Added tests for the contains
        cy.contains('Admin Dashboard');
        // cy.contains("Upcoming Events");
        cy.contains("Patient's list");
        cy.contains("Blood Donations")
    })


})