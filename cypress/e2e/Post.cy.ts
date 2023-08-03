describe('Test about posts that does not require loggin', () => {
    beforeEach(() => {
        cy.visit('https://larrywongkahei.github.io/DuoBuddy/')
    })
    it('should be able to search for post by name or tags in home page', () => {
        cy.get(".searchInput").type("a").type('{enter}').url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/searchResult/a')
        cy.go('back').get(".searchInput").type("d").type('{enter}').url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/searchResult/d')
    })
    it('project should be able to be searched by name or tag', () => {
        cy.get(".searchInput").type("python").type('{enter}').url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/searchResult/python')
        cy.get(".searchResultProjects").should('have.length', 0)
        cy.get(".searchPageInput").type("java").type('{enter}').url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/searchResult/java')
        cy.get(".searchResultProjects").should('have.length', 1)
        cy.get(".searchPageInput").type("duo").type('{enter}').url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/searchResult/duo')
        cy.get(".searchResultProjects").should('have.length', 1)
    })
    it('should be able to navigate to project by searching or explore', () => {
        cy.contains('Explore').click().wait(1000)
        cy.get(".titleLink").should('exist')
        cy.go('back')
        cy.get(".searchInput").type("java").type('{enter}')
        cy.get(".titleLink").should('exist').click()
        cy.url().should('contain', "https://larrywongkahei.github.io/DuoBuddy/#/post")
        cy.get(".ProjectPageTitle").should('exist')
        cy.get(".ProjectPageHeaderDetail").should('exist')
        cy.get(".mainContent").should('exist')
    })
    it('should not be able to comment when not logged in', () => {
        cy.on('window:alert', (text) => {
            expect(text).equal("Log in first")
        })
        cy.contains('Explore').click().wait(1000)
        cy.get(':nth-child(1) > .titleLink > h1').click()
        cy.get(".CommentBox").type("Test Comment")
        cy.get(`[type = 'submit']`).click()
    })
    it('should not be able to post a post if not logged in', () => {
        cy.on('window:alert', (text) => {
            expect(text).equal("Sign in first")
        })
        cy.contains('Explore').click()
        cy.get('.postButton').click()
        cy.url().should('equal', "https://larrywongkahei.github.io/DuoBuddy/#/explore")
    })
})
describe('Test about posts that require loggin', () => {
    beforeEach(() => {
        cy.visit('https://larrywongkahei.github.io/DuoBuddy/')
        cy.get('.loginIcon').click()
        cy.get(`[type = 'email']`).type('test1@gmail.com', { force: true })
        cy.get(`[type = 'password']`).type('test1', { force: true })
        cy.get(`[type = 'submit']`).click({ force: true })
        cy.intercept('https://larrywongkahei.github.io/DuoBuddy/').as('login')
        cy.wait('@login')
    })
        it('should be able to comment if logged in', () => {
        cy.contains('Explore').click()
        cy.get(':nth-child(1) > .titleLink > h1').click()
        cy.reload();
        cy.get('.eachComment').its('length').then((previousData) => {
            cy.get(".CommentBox").type("Test Comment")
            cy.get(`[type = 'submit']`).click()
            cy.reload().wait(2000)
            cy.get('.eachComment').its('length').then((nextValue) => {
                expect(previousData).equal(nextValue - 1)
            })
        })

    })
    it('should be able to post a post if logged in', () => {
        cy.contains('Explore').click()
        cy.get('.postButton').click()
        cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/idea/post')
        cy.get('.inputAndButton > input').type("test input 1")
        cy.get('.inputAndButton > button').click()
        cy.get('.introduceYourselfContainer > .inputAndButton > textarea').type("test input 2")
        cy.get('.introduceYourselfContainer >.inputAndButton > button').click()
        cy.get('.ideaDetailContainer > .inputAndButton > textarea').type("test input 3")
        cy.get('.ideaDetailContainer > .inputAndButton> button').click()
        cy.get('.explainInspiration > .inputAndButton > textarea').type("test input 4")
        cy.get('.explainInspiration > .inputAndButton> button').click()
        cy.get('.others > .inputAndButton > textarea').type("test input 5")
        cy.get('.others > .inputAndButton> button').click()
        cy.get('.tagsInput').type("tag1")
        cy.get('.addTagsContainer > button').click()
        cy.get('.tagsInput').type("tag2")
        cy.get('.addTagsContainer > button').click()
        cy.get('.nextPage').click()
        cy.url().should('not.equal', 'https://larrywongkahei.github.io/DuoBuddy/#/idea/post')
        cy.get(".ProjectPageTitle").should('exist')
        cy.get(".ProjectPageHeaderDetail").should('exist')
        cy.get(".mainContent").should('exist')
    })
    it('should be able to delete a post as a creater', () => {
        cy.on('window:confirm', (text) => 
        {
            expect(text).equal("Delete this post?")
            return true
        }
            );
        cy.contains('Explore').click()
        cy.contains('test input 1').should('exist').click()
        cy.get('.TitleAndApplyButton > button').should('contain', "Close this post").click()
        cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/explore')
        cy.contains('test input 1').should('not.be.exist')
    // })
    it('should be able to delete a comment', () => {
        cy.on("window:confirm", (text) => {
            expect(text).equal("Confirm delete comment?")
            return true
        });
        cy.contains("Explore").click()
        cy.get(':nth-child(1) > .titleLink > h1').click()
        cy.get('.eachComment').its('length').then((previousData) => {
            cy.get(".deleteCommentButton").should('be.visible')
            cy.get(':nth-child(2) > .deleteCommentButton').click()
            cy.reload().wait(2000)
            cy.get('.eachComment').its('length').then((nextValue) => {
                expect(previousData).equal(nextValue + 1)
            })
        })
    })
    it('should be able to post a post if logged in', () => {
        cy.contains('Explore').click()
        cy.get('.postButton').click()
        cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/idea/post')
        cy.get('.inputAndButton > input').type("test input 1")
        cy.get('.inputAndButton > button').click()
        cy.get('.introduceYourselfContainer > .inputAndButton > textarea').type("test input 2")
        cy.get('.introduceYourselfContainer >.inputAndButton > button').click()
        cy.get('.ideaDetailContainer > .inputAndButton > textarea').type("test input 3")
        cy.get('.ideaDetailContainer > .inputAndButton> button').click()
        cy.get('.explainInspiration > .inputAndButton > textarea').type("test input 4")
        cy.get('.explainInspiration > .inputAndButton> button').click()
        cy.get('.others > .inputAndButton > textarea').type("test input 5")
        cy.get('.others > .inputAndButton> button').click()
        cy.get('.tagsInput').type("tag1")
        cy.get('.addTagsContainer > button').click()
        cy.get('.tagsInput').type("tag2")
        cy.get('.addTagsContainer > button').click()
        cy.get('.nextPage').click()
        cy.url().should('not.equal', 'https://larrywongkahei.github.io/DuoBuddy/#/idea/post')
        cy.get(".ProjectPageTitle").should('exist')
        cy.get(".ProjectPageHeaderDetail").should('exist')
        cy.get(".mainContent").should('exist')
    })
    it('should be able to delete a post as a creater', () => {
        cy.on('window:confirm', (text) => 
        {
            expect(text).equal("Delete this post?")
            return true
        }
            );
        cy.contains('Explore').click()
        cy.contains('test input 1').should('exist').click()
        cy.get('.TitleAndApplyButton > button').should('contain', "Close this post").click()
        cy.url().should('equal', 'https://larrywongkahei.github.io/DuoBuddy/#/explore')
        cy.contains('test input 1').should('not.be.exist')
    })
    it('should be able to delete a comment', () => {
        cy.on("window:confirm", (text) => {
            expect(text).equal("Confirm delete comment?")
            return true
        });
        cy.contains("Explore").click()
        cy.get(':nth-child(1) > .titleLink > h1').click()
        cy.get('.eachComment').its('length').then((previousData) => {
            cy.get(".deleteCommentButton").should('visible').click()
            cy.reload().wait(2000)
            cy.get('.eachComment').its('length').then((nextValue) => {
                expect(previousData).equal(nextValue + 1)
            })
        })
    })
})