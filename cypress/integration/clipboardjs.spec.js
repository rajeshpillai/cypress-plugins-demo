/// <reference types="cypress" />
describe("Access clipboard", () => {
  it("visit the https://clipboardjs.com/", () => {
    cy.visit("https://clipboardjs.com/");
  });

  it("click to copy", () => {
    cy.get("button[data-clipboard-action='copy']").realClick();
  });

  it("access the clipboard", async () => {
    cy.get("button[data-clipboard-action='copy']").realClick();

    let text =   await cy.task('getClipboard');
    cy.log("From clipboard: " + text);
    cy.get("button[data-clipboard-target='#foo']").realClick();
    const url = await cy.task('getClipboard'); 
    cy.log("From clipboard: " + url);
  })
})