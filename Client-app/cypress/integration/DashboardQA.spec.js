describe("Cypress QA testing", () => { 
    
   
      
    it("first", () => {
      // Visit our app url
      cy.visit("localhost:3000");

    


      /* ==== Generated with Cypress Studio ==== */

    
      cy.get('#email').clear();
      cy.get('#email').type('anxaxn@gmail.com');
      cy.get('#password').clear();
      cy.get('#password').type('ab');
      cy.get('#password').clear();
      cy.get('#password').type('abcdefghi');
      cy.get('.MuiButton-root').click({timeout:1200});
      // cy.wait(2000);
      cy.get('.MuiBackdrop-root').click({force: true});
      cy.get('#root').click({force: true});
      cy.get('#email').clear();
      cy.get('#email').type('alizahirpsn@gmail.com');
      cy.get('#password').click({force: true});
      cy.get('#password').clear();
      cy.get('#password').type('client1223');
      cy.get('.MuiButton-root').click({force:true});
      cy.get('.MuiBackdrop-root').click({force: true});
      cy.get('#password').click({force: true});
      cy.get('#password').clear();
      cy.get('#password').type('client12345');
      cy.get('.MuiButton-root').click({force: true});
      cy.get('.MuiGrid-container > :nth-child(1) > .dashboard-card__container > .dashboard-card__img').click();
      cy.get(':nth-child(2) > a > .dashboard-card__container').click();
      cy.get('[data-testid="MenuIcon"]').click({force: true});
      cy.get(':nth-child(1) > .MuiListItemText-root > .MuiTypography-root').click();
      cy.get('[data-testid="profile"]').click({force: true});
      cy.get('[data-testid="EditIcon"]').click({force: true});
      cy.get('#firstName').clear();
      cy.get('#firstName').type(' Mohammad Ali');
      cy.get('.update-button').click({force: true});
      cy.get(':nth-child(4) > a > .dashboard-card__container').click({force: true});
      cy.get('#mui-1').clear();
      cy.get('#mui-1').type('Hello doctor I need some help');
      cy.get('.css-ju8w42').click({force: true});
      cy.get('#mui-1').clear({force: true});
      cy.get('#mui-1').type('I need a doctor');
      cy.get(':nth-child(3) > .MuiButton-root').click({force: true});
      cy.get('[data-testid="HomeRoundedIcon"]').click();
      cy.get(':nth-child(8) > .dashboard-card__container > .dashboard-card__img').click();
      cy.get(':nth-child(7) > a > .dashboard-card__container > .dashboard-card__img').click();
      cy.get('[href="/notifications"] > .MuiButtonBase-root > .bottomNav-iconTitle').click();
      cy.get('[data-testid="profile"]').click();
      cy.get('body').click();
      cy.get('.MuiButton-root > .bottomNav-iconTitle').click({force: true});
      cy.get('[data-testid="signout"]').click({force: true});
      /* ==== End Cypress Studio ==== */
    })

})

