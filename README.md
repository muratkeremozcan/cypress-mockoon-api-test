# Cypress API test with Mockoon

```bash
yarn install
yarn cy:open
yarn cy:run
```

## The API under test

The API we are using https://test-api.k6.io/.

There is a `test.rest` file in the repo root that can help us get familiar with the API. It uses [VsCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to test the api like we would do with Postman.

## Static-analysis

```bash
yarn lint
yarn typecheck
yarn check-format # check only changed files

# all the above in parallel
yarn validate
```
