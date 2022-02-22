/// <reference types="cypress" />

// overall description of the test
describe("Dashboard page testing", () => {
    it("first", () =>{
        cy.visit('/');

        // Added tests for the contains
        cy.contains('Admin Dashboard');
        // cy.contains("Upcoming Events");
        cy.contains("Patient's list");
        cy.contains("Blood Donations");

        // Added asserts 
        cy.get('h5').contains('Important Links');
        cy.get('a').contains('Data of COVID-19 in Quebec');

        // Added click assertions
        cy.get('a').contains('Appointment for vaccination').click();
    })


})