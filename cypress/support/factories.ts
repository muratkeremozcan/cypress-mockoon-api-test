import { faker } from '@faker-js/faker'
import { CrocodileBase } from './e2e'

function getEnvironment() {
  const baseUrl = Cypress.config('baseUrl')
  const environment = baseUrl.includes('localhost')
    ? 'local'
    : baseUrl.includes('dev')
      ? 'dev'
      : baseUrl.includes('stage')
        ? 'stage'
        : 'dev' // default to dev if nothing else

  return environment
}

export const generateCrocodile = (): CrocodileBase => {
  if (getEnvironment() !== 'local') {
    return {
      name: faker.person.fullName(),
      sex: ['M', 'F'][Cypress._.random(0, 1)],
      date_of_birth: faker.date
        .past({ years: 20, refDate: '2020-01-01' })
        .toISOString()
        .split('T')[0]
    }
  } else {
    // use fixed data for local
    return {
      name: 'Dustin Schneider',
      sex: 'M',
      date_of_birth: '2018-10-12'
    }
  }
}

export const generateUser = () => {
  // if (getEnvironment() !== 'local') {
  return {
    username: faker.internet.userName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  // }
  // else {
  //   // use fixed data for local
  //   return {
  //     username: 'Tessie.Walker',
  //     first_name: 'Samir',
  //     last_name: 'Lakin',
  //     email: 'Newton_Waters@hotmail.com'
  //   }
  // }
}
