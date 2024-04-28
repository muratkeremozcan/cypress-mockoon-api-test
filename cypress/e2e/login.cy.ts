import { faker } from '@faker-js/faker'
import spok from 'cy-spok'

describe('login', () => {
  it('should login with a user', () => {
    const password = 'Password-1'
    const username = faker.internet.userName()
    const user = {
      username,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password
    }

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
    cy.getSessionToken('test-login').should('be.a', 'string')
  })
})
