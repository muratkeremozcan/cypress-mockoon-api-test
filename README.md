# Cypress API test with Mockoon

When testing UI apps, we easily mock the network with `cy.intercept`, but until now there was no good way to do a similar thing when testing APIs.

Mockoon is a free and open-source desktop application allowing to quickly mock servers and API.

In the real world, we probably would not be mocking the one service under test, but rather the services it depends on. This is where Mockoon comes in handy.

```bash
yarn install

# test the deployment
yarn cy:open-dev
yarn cy:run-dev

# test locally against mock server

# starts mockoon server
yarn mock:server
# alternatively you can run mockoon app locally
# and open the mock file in this repo at ./mockoon/crud-croc.json

yarn cy:open-dev
yarn cy:run-dev
```

## The API under test

The API we are using https://test-api.k6.io/.

There is a `test.rest` file in the repo root that can help us get familiar with the API. It uses [VsCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to test the api like we would do with Postman.

## Static-analysis

```bash
yarn lint
yarn typecheck
# all the above in parallel
yarn validate
```
