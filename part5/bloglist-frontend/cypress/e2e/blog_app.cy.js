describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ name: 'user1', username: 'user1', password: 'password' })
    cy.createUser({ name: 'user2', username: 'user2', password: 'password' })
    cy.visit('')

    // user2 creates a blog
    cy.login({ username: 'user2', password: 'password' })
    cy.createBlog({ title: 'blog user 2', author: 'messi', url: 'test.com', likes: 5 })
    cy.get('#logout-button').click()

    cy.visit('')
  })

  describe('Login', () => {
    it('login form is shown', () => {
      cy.contains('login')
    })

    it('succeds with correct credentials', () => {
      cy.get('#username').type('user1')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('user1 logged-in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('bad_user')
      cy.get('#password').type('bad_password')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'user1', password: 'password' })
    })

    it('A blog can be created', () => {
      cy.contains('new blog').click()
      cy.get('#title').type('blog user 1')
      cy.get('#author').type('ronaldo')
      cy.get('#url').type('lol.com')
      cy.get('#create-blog-button').click()

      cy.contains('a new blog "blog user 1" by ronaldo added')
    })

    it.only('A blog can be liked', () => {
      cy.createBlog({ title: 'blog user 1', author: 'ronaldo', url: 'lol.com' })
      cy.contains('blog user 1')
        .contains('view').click()
      cy.contains('likes').get('#like-button').click()
    })

    it.only('A blog can be deleted', () => {
      cy.createBlog({ title: 'blog user 1', author: 'ronaldo', url: 'lol.com' })
      cy.contains('blog user 1')
        .contains('view').click()
        .get('#delete-button').click()
    })

    it('A blog from other user can not be deleted', () => {
      cy.contains('blog user 2').get('#view-button').click()
      cy.should('not.contain', '#delete-button')
    })
  })
  describe('When several blogs exists', () => {
    beforeEach(() => {
      cy.login({ username: 'user1', password: 'password' })
      cy.createBlog({ title: 'title with most likes', author: 'messi', url: 'test.com', likes: 7 })
      cy.createBlog({ title: 'title with least likes', author: 'messi', url: 'test.com', likes: 1 })
    })
    it('Most liked blog shows first', () => {
      cy.get('.blog').eq(0).should('contain', 'title with most likes')
      cy.get('.blog').eq(2).should('contain', 'title with least likes')
    })
  })
})
