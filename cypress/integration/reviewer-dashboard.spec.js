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
    //const url = cy.task('getItem', 'url');
    //cy.visit(url);
  });
})