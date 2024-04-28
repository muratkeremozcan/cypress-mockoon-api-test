import { faker } from '@faker-js/faker'

const userData = {
  username: faker.internet.userName(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}
export type UserData = typeof userData

const createUser = (user: UserData) => {
  cy.log(`**createUser ${user.username}**`)
  return cy.api({
    method: 'POST',
    url: '/user/register/',
    body: user
  })
}
Cypress.Commands.add('createUser', createUser)

Cypress.Commands.add(
  'maybeCreateUser',
  (sessionName: string, user: UserData = userData) =>
    cy.dataSession({
      name: `${sessionName}`,

      validate: () => true,

      setup: () => createUser(user),
      shareAcrossSpecs: true
    })
)

const login = (username: string, password: string) => {
  cy.log(`**login ${username}**`)
  cy.api({
    method: 'POST',
    url: '/auth/token/login/',
    body: {
      username,
      password
    }
  })
}
Cypress.Commands.add('login', login)

Cypress.Commands.add(
  'getSessionToken',
  (
    sessionName: string,
    username: string = userData.username,
    password: string = userData.password
  ) =>
    cy
      .dataSession({
        name: `${sessionName}`,

        validate: () => true,

        setup: () => {
          createUser(userData)
          login(username, password)
        },

        shareAcrossSpecs: true
      })
      .its('body.access')
)
