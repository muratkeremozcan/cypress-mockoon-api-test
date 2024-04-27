import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default function tasks(on: Cypress.PluginEvents) {
  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        })
      ]
    })
  )
}
