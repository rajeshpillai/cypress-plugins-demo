/// <reference types="cypress" />

describe("Clipboard spec", () => {
  it('test', () => {
    const textToCopy = 'test{selectall}'
    cy.document().then( doc => {
        doc.body.innerHTML = '<input id="inp">';
    });
    
    cy.get('#inp').type(textToCopy);
    cy.get('#inp').invoke('val', textToCopy)

    // cy.document().then( doc => {
    //     doc.execCommand('copy');
    // });

    // cy.window().then((win) => {
    //   win.focus();
    //   win.navigator.clipboard.readText().then((text) => {
    //     expect(text).to.contain('test');
    //   });
    // });
    
    cy.task('getClipboard').should('contain', 'test');
  });
})