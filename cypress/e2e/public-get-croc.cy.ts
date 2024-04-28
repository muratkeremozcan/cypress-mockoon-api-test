import spok from 'cy-spok'

describe('Public APIs', () => {
  const crocProps = {
    id: spok.number,
    name: spok.string,
    sex: spok.string,
    date_of_birth: spok.string,
    age: spok.number
  }

  it('should GET all crocodiles, and validate the properties of each crocodile', () => {
    cy.getPublicCrocodiles()
      .should(
        spok({
          status: 200,
          body: spok.array
        })
      )
      .its('body')
      .each(spok(crocProps))
  })

  it('should GET one crocodile', () => {
    const id = 1
    cy.getPublicCrocodile(id).should(
      spok({
        status: 200,
        body: {
          ...crocProps,
          id
        }
      })
    )
  })
})
