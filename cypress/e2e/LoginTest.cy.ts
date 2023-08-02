
describe('Login test', () => {
    beforeEach(() => {
        cy.visit('https://larrywongkahei.github.io/DuoBuddy/')
        cy.get('.loginIcon').click()
    })
    
    it('should show alert if not input all detail or wrong detail', () => {
        cy.get(`[type = 'email']`).type('testing1@gmail.com', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true })
        cy.on('window:alert', text => {
            if(text === "Please fill in all fields"){
                expect(text).equal("Please fill in all fields")
            }else{
                expect(text).equal("Wrong detail")
            }
        })
        cy.get(`[type = 'email']`).clear()
        cy.get(`[type = 'password']`).type('test1', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true })
        cy.get(`[type = 'password']`).clear()
        cy.get(`[type = 'email']`).type('test1@gmail.com', {force:true})
        cy.get(`[type = 'password']`).type('testing1', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true })

    })
    it('should be able to login', () => {
        cy.get(`[type = 'email']`).type('test1@gmail.com', {force:true})
        cy.get(`[type = 'password']`).type('test1', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true })
        cy.intercept('https://larrywongkahei.github.io/DuoBuddy/').as('login')
        cy.wait('@login')
        cy.contains('Explore').should('exist')
        cy.get('.userAvatar').should('exist')
        cy.get('#logoutButton').should('exist')
        cy.get('.loginIcon').should('not.exist')
    })
    it('should be able to log out', () => {
        cy.get(`[type = 'email']`).type('test1@gmail.com', {force:true})
        cy.get(`[type = 'password']`).type('test1', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true })
        cy.intercept('https://larrywongkahei.github.io/DuoBuddy/').as('login')
        cy.wait('@login')
        cy.contains('Explore').should('exist')
        cy.get('.userAvatar').should('exist')
        cy.get('#logoutButton').should('exist')
        cy.get('.loginIcon').should('not.exist')
        cy.get('#logoutButton').click()
        cy.wait('@login')
        cy.contains('Explore').should('exist')
        cy.get('.userAvatar').should('not.exist')
        cy.get('#logoutButton').should('not.exist')
        cy.get('.loginIcon').should('exist')
    })
})