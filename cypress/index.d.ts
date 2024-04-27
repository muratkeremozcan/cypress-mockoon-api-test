/* eslint-disable @typescript-eslint/no-unused-vars */

import type { UserData } from './support/register-login-user'
import type { Crocodile } from './support/e2e'

/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** Gets a list of crocodiles
       * ```js
       * cy.getCrocodiles()
       * ```
       */
      getCrocodiles(
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile[]> & Messages>

      /** Gets an order by id
       * ```js
       * cy.getOrder(token, orderId)
       * ```
       */
      getCrocodile(
        id: number,
        allowedToFail?: boolean
      ): Chainable<Response<Crocodile> & Messages>

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

      maybeLogin(
        sessionName: string,
        username?: string,
        password?: string
      ): Chainable<any>
    }
  }
}
