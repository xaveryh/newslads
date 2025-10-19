const API_URL = "https://eventregistry.org/api/v1"
const APP_URL = Cypress.env("CYPRESS_STAGING_APP_URL") 

describe('Checks if server is up', () => {
  it('Passes', () => {
    cy.visit(APP_URL)
  })
});

it('Explores daily news', function() {
  cy.intercept(`${API_URL}/article/getArticles*`).as("getHeadlines")

  cy.visit(APP_URL)

  cy.wait("@getHeadlines")

  cy.get("#latest-headlines")
    .children()  
    .should("have.length", 3)
});

