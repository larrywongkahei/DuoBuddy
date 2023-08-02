describe('Login test', () => {
    beforeEach(() => {
        cy.visit('https://larrywongkahei.github.io/DuoBuddy/')
        cy.get(`[type = 'email']`).clear()
        cy.get(`[type = 'password']`).clear()
        cy.get('.loginIcon').click()
    })
    // it('should not be able to log in with unregistered account detail', () => {
    //     cy.get(`[type = 'email']`).type('testing1', {force:true})
    //     cy.get(`[type = 'password']`).type('testing1', {force:true})
    //     cy.get(`[type = 'submit']`).click({ force: true })
    //     cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/login')
    //     cy.on('window:alert', (alert) => {
    //         expect(alert).equal('Wrong detail')
    //     })
    //     cy.get('.userAvatar').should('not.exist')
    //     cy.get('#logoutButton').should('not.exist')
    // })
    it('should show alert if not input all detail or wrong detail', () => {
        cy.on('window:alert', text => {
            expect(text).toEqual("hi")
        })
        cy.get(`[type = 'email']`).type('testing1@gmail.com', {force:true})
        // cy.get(`[type = 'password']`).type('testing1', {force:true})
        cy.get(`[type = 'submit']`).click({ force: true }).wait(2000)
        // cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/login')
        // cy.get('.userAvatar').should('not.exist')
        // cy.get('#logoutButton').should('not.exist')
    })
})