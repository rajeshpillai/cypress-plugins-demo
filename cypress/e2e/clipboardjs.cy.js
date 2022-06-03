/// <reference types="cypress" />
describe("Access clipboard", () => {
  it("visit the https://clipboardjs.com/", () => {
    cy.visit("https://clipboardjs.com/");
  });

  it("click to copy", () => {
    cy.get("button[data-clipboard-action='copy']").click();
  });

  it("access the clipboard", async () => {
    cy.get("button[data-clipboard-action='copy']").click();

    cy.task('getClipboard').then(text => {
      cy.log("From clipboard: " + text);
      cy.get("button[data-clipboard-target='#foo']").click();
    });
    
    cy.task('getClipboard').then(url => {
      cy.log("After From clipboard: " + url);
    })
  })
})