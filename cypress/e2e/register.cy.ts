import spok from 'cy-spok'
import { generateUser } from '../support/factories'

describe('user registration', () => {
  it('should create a user', () => {
    const user = generateUser()

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
