import { faker } from '@faker-js/faker'
import spok from 'cy-spok'

describe('user registration and login', () => {
  const password = 'Password-1'
  const username = faker.internet.userName()
  const user = {
    username,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password
  }

  context('user registration', () => {
    it('should create a user', () => {
      const { password, ...body } = user

      cy.api({
        method: 'POST',
        url: '/user/register/',
        body: user
      }).should(
        spok({
          status: 201,
          body
        })
      )
    })

    it('should create a user with data-session', () => {
      const userProps = {
        username: spok.string,
        first_name: spok.string,
        last_name: spok.string,
        email: spok.string
      }
      cy.maybeCreateUser('test-user').should(
        spok({
          status: 201,
          body: userProps
        })
      )

      cy.maybeCreateUser('test-user').should(
        spok({
          status: 201,
          body: userProps
        })
      )
    })
  })

  context('login', () => {
    it('should login with a user', () => {
      cy.createUser(user)

      cy.login(username, password).should(
        spok({
          status: 200,
          body: {
            refresh: spok.string,
            access: spok.string
          }
        })
      )
    })

    it('should login with a data-session', () => {
      cy.getSessionToken('test-session').should('be.a', 'string')
    })
  })
})
