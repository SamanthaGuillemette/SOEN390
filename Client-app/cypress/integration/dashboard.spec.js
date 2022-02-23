/// <reference types="cypress" />

describe("Login flow testing", () => {
    it("first", () => {
      // Visit our app url
      cy.visit("localhost:3000");

      // Wrong credentials, redirects back to home page
      cy.get("#email").type("SOEN390");
      cy.get("#password").type("client12345");
      cy.contains("Sign In").click();
      cy.wait(4000);
      cy.visit("localhost:3000");
 
      
      // Get the email & password box, type in credentials
      cy.get("#email").type("alizahirpsn@gmail.com");
      cy.get("#password").type("client12345");
  
      // Submit sign in 
      cy.contains("Sign In").click();

      // Wait for a bit and then go symptoms page
      cy.wait(4000);
      cy.contains("Symptoms").click();

      // Wait for a bit and click the more button
      cy.wait(4000);
      cy.get('p').contains("More").click();

      // Wait for a bit and then click the signout button 
      cy.wait(4000);
      cy.get('div').contains("Signout").click();
    
    
  
   
  
     
    });
  });
  