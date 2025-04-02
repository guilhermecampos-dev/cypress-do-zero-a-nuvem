Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail.com')
    cy.get('#open-text-area').type('Teste.')
    cy.get('button[type="submit"]').click()
})