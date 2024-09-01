// <reference types="cypress" />

describe('Better Roaming Plan Validation', () => {

  before(() => {
    cy.viewport(1920, 1080); // Set the viewport size
  });

  const COOKIE_NAME = "Cookies provide you with a personalised experience";
  const COOKIE_VALUE = "Accept All";

  it('Validates the plan details for Thailand', () => {
    // Step 1: Open the website
    cy.visit('https://www.betterroaming.com/', {
      onBeforeLoad: (win) => {
        // Set the cookie to bypass the cookie consent banner
        win.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; path=/`;
      }
    });

    // Step 2: Select Euro as currency
    cy.get('.justify-end > .cursor-pointer > :nth-child(2)').click();
    cy.get('.MuiPaper-root > .grid > :nth-child(2)').click();

    // Step 3: Click on Thailand
    cy.get('.Thailand > .muuri-safe > .justify-between', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Wait for the plan details to load
    cy.get('.py-8 > .container > .grid > :nth-child(3)', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        // Validate the details of the plan
        cy.contains('Thailand').should('be.visible');
        cy.contains('5 GB').should('be.visible');
        cy.contains('30 DAYS').should('be.visible');
        cy.contains('Data only').should('be.visible');

        // Step 4: Check the price and validate
        const expectedPrice = '€9.19';
      });
  });

});
