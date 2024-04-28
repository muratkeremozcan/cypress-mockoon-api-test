import { generateCrocodile } from '../support/e2e'
import { retryableBefore } from '../support/retryable-before'
import spok from 'cy-spok'

describe('CRUD crocodile', () => {
  let token: string

  const crocodile = generateCrocodile()
  const crocProps = {
    id: spok.number,
    name: spok.string,
    sex: spok.string,
    date_of_birth: spok.string,
    age: spok.number
  }

  retryableBefore(() => {
    cy.getSessionToken('test-session').then((t) => {
      token = t
    })
  })

  it('should crud', () => {
    cy.createCrocodile(token, crocodile)
      .should(
        spok({
          status: 201,
          body: crocProps
        })
      )
      .its('body.id')
      .then((id) => {
        cy.getMyCrocodiles(token)
          .should(
            spok({
              status: 200,
              body: spok.array
            })
          )
          .its('body')
          .findOne({ name: crocodile.name })

        cy.getMyCrocodile(token, id).should(
          spok({
            status: 200,
            body: {
              ...crocProps,
              id
            }
          })
        )

        const editedCrocodile = {
          ...generateCrocodile(),
          id,
          age: spok.number
        }
        cy.updateCrocodile(token, editedCrocodile)
        cy.getMyCrocodile(token, id).should(
          spok({
            status: 200,
            body: {
              ...editedCrocodile
            }
          })
        )

        const patchedCrocodile = {
          id,
          name: 'Big Bertha PATCH'
        }
        cy.patchCrocodile(token, patchedCrocodile)
        cy.getMyCrocodile(token, id).should(
          spok({
            status: 200,
            body: {
              ...crocProps,
              ...patchedCrocodile
            }
          })
        )

        cy.deleteCrocodile(token, id)
        cy.getMyCrocodiles(token)
          .its('body')
          .each(spok(crocProps))
          .findOne({ name: crocodile.name })
          .should('not.exist')
      })
  })
})
