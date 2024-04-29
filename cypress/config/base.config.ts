import plugins from '../support/plugins'
import tasks from '../support/tasks'
import esbuildPreprocessor from '../support/esbuild-preprocessor'

export const baseConfig: Cypress.ConfigOptions = {
  viewportHeight: 1280,
  viewportWidth: 1280,

  e2e: {
    setupNodeEvents(on, config) {
      esbuildPreprocessor(on)
      tasks(on)
      return plugins(on, config)
    },
    baseUrl: 'https://test-api.k6.io'
  }
}
