describe('Test links in home page', () => {
  beforeEach(() => {
    cy.visit('https://larrywongkahei.github.io/DuoBuddy/')
  })
  it('Get to the page', () => {
  })
  it('Get to home page by clicking home button', () => {
    cy.get('.Title').click()
    cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/')
  })
  it('Get to explore page', () => {
    cy.contains('Explore').click()
    cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/explore')
  })
  it('Get to login page', () => {
    cy.get('.loginIcon').click()
    cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/login')
  })
  it('Should not have user profile image and logout button if not signed in', () => {
    cy.get('.loginIcon').should('exist')
    cy.contains('Explore').should('exist')
    cy.get('.userAvatar').should('not.exist')
    cy.get('#logoutButton').should('not.exist')
  })
  it('Should be able to redirect page to my contacts', () => {
    cy.get(".githubHome").click()
    cy.wait(3000)
    // cy.url().should('equal', 'https://github.com/larrywongkahei')
  })
})