/* eslint-disable @typescript-eslint/no-unused-vars */

import type { UserData } from './support/register-login-user'
import type { CrocodileBase, CrocodileWithId, Crocodile } from './support/e2e'

/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** Creates a user
       */
      createUser(user: UserData): Chainable<any>

      /**
       * If the user exists, reuses it
       * If no user is exists, creates a user
       */
      maybeCreateUser(sessionName: string, user?: UserData): Chainable<any>

      /** logs in with the username and password */
      login(username: string, password: string): Chainable<any>

      getSessionToken(
        sessionName: string,
        username?: string,
        password?: string
      ): Chainable<any>

      /** Gets a list of public crocodiles
       * ```js
       * cy.getPublicCrocodiles()
       * ```
       */
      getPublicCrocodiles(
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile[]> & Messages>

      /** Gets a public crocodile by id
       * ```js
       * cy.getPublicCrocodile(1)
       * ```
       */
      getPublicCrocodile(
        id: number,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

      /** Gets a list of authenticated crocodiles
       * ```js
       * cy.getMyCrocodiles(token)
       * ```
       */
      getMyCrocodiles(
        token: string,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile[]> & Messages>

      /** Gets an authenticated crocodile by id
       * ```js
       * cy.getMyCrocodile(token, 1)
       * ```
       */
      getMyCrocodile(
        token: string,
        id: number,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

      /** Creates a crocodile
       * ```js
       * cy.createCrocodile(token, body)
       * ```
       */
      createCrocodile(
        token: string,
        body: CrocodileBase,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

      /** Updates a crocodile
       * ```js
       * cy.updateCrocodile(token, body)
       * ```
       */
      updateCrocodile(
        token: string,
        body: CrocodileWithId,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

      /** Patches a crocodile
       * ```js
       * cy.patchCrocodile(token, body)
       * ```
       */
      patchCrocodile(
        token: string,
        body: Partial<CrocodileWithId>,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

      /** Deletes a crocodile
       * ```js
       * cy.deleteCrocodile(token)
       * ```
       */
      deleteCrocodile(
        token: string,
        id: number,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>
    }
  }
}
