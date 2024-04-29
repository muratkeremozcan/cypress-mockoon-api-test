import { generateUser } from './factories'

const userData = generateUser()
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
