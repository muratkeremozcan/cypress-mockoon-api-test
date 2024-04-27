import log from './log'
import * as token from '../../scripts/cypress-token'

/**
 * The collection of tasks to use with `cy.task()`
 * @param on `on` is used to hook into various events Cypress emits
 */
export default function tasks(on: Cypress.PluginEvents) {
  on('task', { log })

  // if you're exporting a function vs default export, you can namespace it and use it like this:
  on('task', token)
}
