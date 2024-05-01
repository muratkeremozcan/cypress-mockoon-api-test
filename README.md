# Cypress API test with Mockoon

When testing UI apps, we easily mock the network with `cy.intercept`, but until now there was no good way to do a similar thing when testing APIs.

Mockoon is a free and open-source desktop application allowing to quickly mock servers and API.

In the real world, we probably would not be mocking the one service under test, but rather the services it depends on. This is where Mockoon comes in handy.

To showcase it, for local testing all the API endpoints are mocked. Mockoon's network recording feature was used to capture them, and later they were fine tuned. While recording and mocking there are two main things to watch out for:

- If subsequent requests to the same endpoint are giving different results, we must utilize mockoon rules to adjust the response per call number. For instance we create something, get it, we update it and get it again. In that case the 2nd response will be different and we handle that with mockoon rules.
- Our tests should be dynamically generating data by nature, but when testing locally, dynamic data can hurt us since the responses in the test cannot possibly comply unless the value checks are very generic. For this reason, we want to randomize the data in the tests only in deployments, and when local use fixed data. Take a look at [the factories](./cypress/support/factories.ts) returning fixed objects when we are working locally

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

There is a `test.http` file in the repo root that can help us get familiar with the API. It uses [VsCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to test the api like we would do with Postman.

## Mockoon tutorial examples

You find the examples from [Mockoon tutorials](https://mockoon.com/tutorials/) under the `mockoon` folder and the `examples.http` file. Just open the file `examples.json` with Mockoon and use Vscode Rest Client to reproduce the tutorials.

## Static-analysis

```bash
yarn lint
yarn typecheck
# all the above in parallel
yarn validate
```
