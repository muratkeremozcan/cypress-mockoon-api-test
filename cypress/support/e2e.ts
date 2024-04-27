import './commands'
import 'cypress-data-session'
import 'cypress-each'
import 'cypress-map'
import '@bahmutov/cy-api'
import './register-login-user'

export type Crocodile = {
  id: number
  name: string
  sex: string
  date_of_birth: string
  age: number
}

const headers = (token) => ({
  'Access-Token': token
})

Cypress.Commands.add('getCrocodiles', (allowedToFail = false) => {
  cy.log('**getCrocodiles**')
  return cy.api({
    method: 'GET',
    url: '/public/crocodiles',
    retryOnStatusCodeFailure: !allowedToFail,
    failOnStatusCode: !allowedToFail
  })
})

Cypress.Commands.add('getCrocodile', (id: number, allowedToFail = false) => {
  cy.log(`**getCrocodile by id: ${id}**`)
  return cy.api({
    method: 'GET',
    url: `/public/crocodiles/${id}`,
    retryOnStatusCodeFailure: !allowedToFail,
    failOnStatusCode: !allowedToFail
  })
})

// Cypress.Commands.add(
//   'createOrder',
//   (
//     token: string,
//     body: Order = {
//       pizza: datatype.number(),
//       address: address.streetAddress()
//     },
//     allowedToFail = false
//   ) =>
//     cy.log('**createOrder**').api({
//       method: 'POST',
//       url: `/orders`,
//       headers: headers(token),
//       body,
//       retryOnStatusCodeFailure: !allowedToFail,
//       failOnStatusCode: !allowedToFail
//     })
// )

// Cypress.Commands.add(
//   'getOrder',
//   (token: string, orderId: string, allowedToFail = false) =>
//     cy.log('**getOrder**').api({
//       method: 'GET',
//       url: `/orders/${orderId}`,
//       headers: headers(token),
//       retryOnStatusCodeFailure: !allowedToFail,
//       failOnStatusCode: !allowedToFail
//     })
// )

// Cypress.Commands.add(
//   'updateOrder',
//   (
//     token: string,
//     orderId: string,
//     body: Order = {
//       pizza: datatype.number(),
//       address: address.streetAddress()
//     },
//     allowedToFail = false
//   ) =>
//     cy.log('**updateOrder**').api({
//       method: 'PUT',
//       url: `/orders/${orderId}`,
//       headers: headers(token),
//       body,
//       retryOnStatusCodeFailure: !allowedToFail,
//       failOnStatusCode: !allowedToFail
//     })
// )

// Cypress.Commands.add(
//   'deleteOrder',
//   (token: string, orderId: string, allowedToFail = false) =>
//     cy.log('**deleteOrder**').api({
//       method: 'DELETE',
//       url: `/orders/${orderId}`,
//       headers: headers(token),
//       retryOnStatusCodeFailure: !allowedToFail,
//       failOnStatusCode: !allowedToFail
//     })
// )

// /** Checks if a pizza with the given id exists in the database */
// const checkPizza = (token: string, pizzaId: number) =>
//   cy
//     .getOrders(token, true) // allowed to fail
//     .its('body')
//     .then(
//       (orders) =>
//         Cypress._.filter(orders, (order) => order.pizza === pizzaId).length
//     )
//     .then(Boolean)

// Cypress.Commands.add(
//   'maybeCreateOrder',
//   (
//     sessionName: string,
//     token: string,
//     body: Order = {
//       pizza: datatype.number(),
//       address: address.streetAddress()
//     }
//   ) =>
//     cy.dataSession({
//       name: `${sessionName}`,

//       // this is not really necessary, it is here for clarity and educational purposes
//       init: () => {
//         cy.log(
//           `**init()**: runs when there is nothing in cache. Yields the value to validate()`
//         )
//       },

//       validate: () => {
//         cy.log(
//           `**validate()**: returns true if the pizza already exists, false otherwise.`
//         )
//         return checkPizza(token, body.pizza)
//       },

//       setup: () => {
//         cy.log(`**setup()**: there is no pizza by that id, so create an order.`)
//         cy.createOrder(token, body)
//       },

//       recreate: () => {
//         cy.log(
//           `**recreate()**: if there is a pizza by that ID, just resolve a promise through`
//         )
//         Promise.resolve()
//       },

//       onInvalidated: () => {
//         cy.log(
//           `**onInvalidated**: runs when validate() returns false; no pizza!`
//         )
//       },

//       shareAcrossSpecs: true
//     })
// )
