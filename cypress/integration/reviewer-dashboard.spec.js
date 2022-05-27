/// <reference types="cypress" />

describe("Reviewer Dashboard", () => {

  it.only('Playwright at work', () => {
    cy.log('Attempt to integrate with safari');
    cy.task('openSafari');
    cy.log('Integrated with safari');
  })

  it('capture profile', async function() {
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
      }),
    );
    
    cy.get(':nth-child(1) > :nth-child(8) > .jss31 > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true}).then(async () => {
      cy.get('#client-snackbar').should('be.visible');

      await cy.task('getClipboard').should('contain', 'test');

      // cy.window().its('navigator.clipboard')
      //   .invoke('readText')
      //   .should('equal', "hello world!");

    })


    // cy.window().then(win =>
    //   new Cypress.Promise((resolve, reject) =>
    //     win.navigator
    //       .clipboard
    //       .readText()
    //       .then(resolve)
    //       .catch(reject))
    // ).should('eq', '`myExpectedClipboardValue')
  
  })
})