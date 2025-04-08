/* Aula 1 */
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
    cy.get('#phone-checkbox').check()
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

  /* Aula 2 */
it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
    .select(1)
    .should('have.value','blog')
})

/* Aula 3 */
it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})

it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    .each( typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
  })
})
/*Marcando (e desmarcando) inputs do tipo checkbox*/
it('marca ambos checkboxes, depois desmarca o último', ()=>{
  cy.get('input[type="checkbox"]')
    .each( typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
  }).last()
    .uncheck()
    .should('not.be.checked')
})
/* selecfile */
it('seleciona um arquivo da pasta fixtures', () =>{
  cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .should( input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo simulando um drag-and-drop',() =>{
  cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should( input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should( input => {
    expect(input[0].files[0].name).to.equal('example.json')
})
})
})
