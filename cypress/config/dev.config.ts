import { defineConfig } from 'cypress'
import { baseConfig } from './base.config'
import merge from 'lodash/merge'

const config = {
  e2e: {
    env: {
      ENVIRONMENT: 'dev'
    },
    baseUrl: 'https://test-api.k6.io'
  }
}

export default defineConfig(merge({}, baseConfig, config))
