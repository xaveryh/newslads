const API_URL = "https://eventregistry.org/api/v1";

const APP_URL = Cypress.env("CYPRESS_STAGING_APP_URL")

describe('Checks if server is up', () => {
  it('Passes', () => {
    cy.visit(APP_URL)
  })
});

it('Explores daily news', function() {
  cy.intercept(`${API_URL}/article/getArticles*`).as("getArticles")

  cy.visit(APP_URL)

  cy.wait("@getArticles")

  cy.get("#latest-headlines")
    .children()  
    .should("have.length", 3)

  cy.get('#latest-headlines a:nth-child(1)').click();

  cy.wait("@getArticles").its("response.statusCode").should("eq", 200)
});


it("Explores specific (sports) news", function() {
  cy.intercept(`${API_URL}/article/getArticles*`).as("getArticles")

  cy.visit(APP_URL)

  cy.get("#sports-button").click()

  cy.wait("@getArticles")

  cy.get("#category-articles-container")
    .children()
    .its("length")
    .should("be.greaterThan", 1)
  
  cy.get("#category-articles-container a:nth-child(1)").click()

  cy.wait("@getArticles").its("response.statusCode").should("eq", 200)
})

it("Searches for topic", function() {
  cy.intercept(`${API_URL}/article/getArticles*`).as("getArticles")
  
  cy.visit(APP_URL)

  cy.get("#navbar-search-button").click()

  cy.get("#search-input").type("Gaza")

  cy.get("#search-submit").click()

  cy.wait("@getArticles")

  cy.get("#searched-articles-container")
    .children()
    .its("length")
    .should("be.greaterThan", 1)


  cy.get("#searched-articles-container a:nth-child(1)").click()

  cy.wait("@getArticles").its("response.statusCode").should("eq", 200)
})

it("Tries to subscribe to a feed and see the feed", function() {
    cy.intercept(`https://api.rss2json.com/v1/api.json*`).as("getFeeds")
  
    cy.visit(APP_URL)

    cy.get("#navbar-rss-button").click()

    cy.get("#rss-channels")
      .children()
      .its("length")
      .should("be.greaterThan", 1)
    
  cy.get("#searched-articles-container div:nth-child(1)")
    .children()
    .get("button:nth-child(1)")
    .click()

  cy.get("#view-feed").click()

  cy.wait("@getFeeds")

  cy.get("#feeds-container")
    .children()
    .its("length")
    .should("be.greaterThan", 1)
})