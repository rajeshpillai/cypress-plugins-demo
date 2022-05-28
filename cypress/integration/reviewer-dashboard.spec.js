/// <reference types="cypress" />

let url = undefined;

describe("Reviewer Dashboard", () => {

  it.only('Playwright at work', async () => {
    cy.log('Attempt to integrate with playwright');
    cy.task('pwGetClipboardData').then(data => {
      cy.log('Integrated with playwright: ' + data);
      url = data;
      cy.task('setItem', {
        name: 'url',
        value: url,
      })
      cy.visit(url);
    });
  })

  it("Visits the page saved in the 'url' variable", () => {
    const url = cy.task('getItem', 'url');
    //cy.visit(url);
  });

  it.skip('capture profile', async function() {
    cy.visit('https://dashboard.kyc.idfystaging.com/?client_id=QA-vkyc-testing_72c53aa1642b');
   
 
    cy.get('#username').type(`hritika.narvekar@idfy.com`)
    cy.get('#password').type(`Hritika@123{enter}`)
    cy.wait(0)
    
    cy.window().its('navigator.permissions')
      .invoke('query', { name: 'clipboard-read' })
      .its('state').then(cy.log)

    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    );
    
    cy.get(':nth-child(1) > :nth-child(8) > .jss31 > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true}).then(async () => {
      cy.get('#client-snackbar').should('be.visible');
      await cy.task('getClipboard').should('contain', 'test');
    })
  
  })
})