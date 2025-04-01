describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia formulários', () => {
    const longText = Cypress._.repeat('Eita', 10)
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.get('button[type="submit"]').click()


    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Eita', 10)
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it(' campos telefone valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    
  })
})

