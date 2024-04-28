import './commands'
import 'cypress-data-session'
import 'cypress-each'
import 'cypress-map'
import '@bahmutov/cy-api'
import './register-login-user'
import { faker } from '@faker-js/faker'

export type CrocodileBase = {
  name: string
  sex: string
  date_of_birth: string
}
export type CrocodileWithId = CrocodileBase & { id: number }
export type Crocodile = CrocodileWithId & {
  age: number
}

const commonHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`
  }
}

export const generateCrocodile = (): CrocodileBase => ({
  name: faker.person.fullName(),
  sex: ['M', 'F'][Cypress._.random(0, 1)],
  date_of_birth: faker.date
    .past({ years: 20, refDate: '2020-01-01' })
    .toISOString()
    .split('T')[0]
})

Cypress.Commands.add('getPublicCrocodiles', (allowedToFail = false) => {
  cy.log('**getPublicCrocodiles**')
  return cy.api({
    method: 'GET',
    url: '/public/crocodiles',
    retryOnStatusCodeFailure: !allowedToFail,
    failOnStatusCode: !allowedToFail
  })
})

Cypress.Commands.add(
  'getPublicCrocodile',
  (id: number, allowedToFail = false) => {
    cy.log(`**getPublicCrocodile by id: ${id}**`)
    return cy.api({
      method: 'GET',
      url: `/public/crocodiles/${id}`,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'getMyCrocodiles',
  (token: string, allowedToFail = false) => {
    cy.log('**getMyCrocodiles**')
    return cy.api({
      method: 'GET',
      url: '/my/crocodiles/',
      headers: commonHeaders(token),
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'getMyCrocodile',
  (token: string, id: number, allowedToFail = false) => {
    cy.log(`**getMyCrocodile by id: ${id}**`)
    return cy.api({
      method: 'GET',
      url: `/my/crocodiles/${id}/`,
      headers: commonHeaders(token),
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'createCrocodile',
  (token: string, body: CrocodileBase, allowedToFail = false) => {
    cy.log('**createCrocodile**')
    return cy.api({
      method: 'POST',
      url: '/my/crocodiles/',
      headers: commonHeaders(token),
      body: body,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'updateCrocodile',
  (token: string, body: CrocodileWithId, allowedToFail = false) => {
    cy.log('**updateCrocodile**')
    return cy.api({
      method: 'PUT',
      url: `/my/crocodiles/${body.id}/`,
      headers: commonHeaders(token),
      body: body,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'patchCrocodile',
  (token: string, body: Partial<Crocodile>, allowedToFail = false) => {
    cy.log('**patchCrocodile**')
    return cy.api({
      method: 'PATCH',
      url: `/my/crocodiles/${body.id}/`,
      headers: commonHeaders(token),
      body: body,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)

Cypress.Commands.add(
  'deleteCrocodile',
  (token: string, id: number, allowedToFail = false) => {
    cy.log('**deleteCrocodile by id: ${id}**')
    return cy.api({
      method: 'DELETE',
      url: `/my/crocodiles/${id}/`,
      headers: commonHeaders(token),
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail
    })
  }
)
