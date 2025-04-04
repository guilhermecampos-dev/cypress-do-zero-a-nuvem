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
    cy.contains('button','Enviar').click()


    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Eita', 10)
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it(' campos telefone valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gui')
    cy.get('#lastName').type('Campos')
    cy.get('#email').type('guimcampos@gmail,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gui')
      .should('have.value','Gui')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Campos')
      .should('have.value','Campos')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('guimcampos@gmail.com')
      .should('have.value','guimcampos@gmail.com')
      .clear()
      .should('have.value','')
    cy.get('#phone')
      .type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','')
      
  })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.contains('button', 'Enviar').click()             

  cy.get('.error').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', () => {
  /*const  data = {
    firstName:'Guilherme',
    lastName:'Campos',
    email:'guimcampos@gmail.com',
    text:'Teste.'
 
  }*/
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
  })
})