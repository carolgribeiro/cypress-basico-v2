/// <reference types="Cypress" />

import { isSymbol } from "cypress/types/lodash"

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

/// MD 2
///Ex 1 e extra 1
    it('seleciona um produto (YouTube) por seu texto', function () {
        const longText = 'Teste' 

        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('carol@teste.com')
        cy.get('#open-text-area').type('Teste', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    } )

///Ex extra 2

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('carol@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

///Ex extra 3
    it('Campo telefone contginua vazio quando valor nao numerico', function () {
        cy.get('#phone')
            .type('abcdefg')
            .should('have.value', '')
    })

    ///Ex extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('carol@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
///Ex extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Carol')
            .should('have.value', 'Carol')
            .clear()
            .should('have.value','')

        cy.get('#lastName')
            .type('Ribeiro')
            .should('have.value', 'Ribeiro')
            .clear()
            .should('have.value','')

        cy.get('#email')
            .type('carol@teste.com')
            .should('have.value', 'carol@teste.com')
            .clear()
            .should('have.value','')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value','')
    })

///Ex extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    ///Ex extra 7 (ERRADO)
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    ///MD 3 Exercicio
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    ///Ex extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    ///Ex extra 2

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

///MD 4 Exercicio
    
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    /// Ex extra
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check ()
                cy.wrap($radio).should('be.checked')
        })
    })

    ///MD 5 Ex
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

/// MD 6 Fazendo upload de arquivos com Cypress
/// Exercicio
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input)  {
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })

    /// Ex Extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input)  {
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })

    ///Ex extra 2
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input)  {
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })

    ///MD 7 Lidando com links que abrem em outra aba
    ///Exercicio
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    ///Ex extra 1
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()    

        cy.contains('Talk About Testing').should('be.visible')
    })

    ///Ex Extra 2 - Na aba privacy.spec.js
    ///MD 8 - Simulando o viewport de um dispositivo móvel
    ///Exercicio - Feito no package.json "scripts - "cypress open"
    ///Ex extra - Feito no package.json "cypress run"

    ///MD9 - Documentação do projeto - READ Me

    ///M19 - Integração Contínua (CI) com GitHub Actions - .github/workflows


  })