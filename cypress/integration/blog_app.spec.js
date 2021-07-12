describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('testuser')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser',
        password: 'test'
      }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('Test Blog')
      cy.get('#authorInput').type('Test User')
      cy.get('#urlInput').type('test url')
      cy.get('#createBlogButton').click()
      cy.contains('Test Blog Test User')
    })

    it('User can like a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('Test Blog')
      cy.get('#authorInput').type('Test User')
      cy.get('#urlInput').type('test url')
      cy.get('#createBlogButton').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User can delete own post', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('Test Blog')
      cy.get('#authorInput').type('Test User')
      cy.get('#urlInput').type('test url')
      cy.get('#createBlogButton').click()
      cy.wait(100)
      cy.reload()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Test Blog Test User')
    })

    it('Blogs are ordered by likes', function() {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title:'post 1', author:'author 1', url:'url 1', likes:3 },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title:'post 2', author:'author 2', url:'url 2', likes:10 },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
      cy.visit('http://localhost:3000')
      cy.contains('post 2 author 2').contains('view').click()
      cy.contains('post 1 author 1').contains('view').click()

      cy.get('.likeDiv').then(likes => {
        cy.wrap(likes[0]).contains('10')
        cy.wrap(likes[1]).contains('3')
      })
    })
  })
})