describe('Регистрация', () => {
  it('Переход на форму авторизации', () => {
    cy.visit('http://localhost:8080/signup')
    cy.contains('h3', 'Форма регистрации')
  })

  it ('Проверка наличия полей', () => {
    cy.contains('Имя пользователя')
    cy.contains('Почта')
    cy.contains('Пароль')
    cy.contains('Повторите пароль')
  }) 

  it ('Проверка наличия кнопок', () => {
    cy.contains('Очистить')
    cy.contains('Регистрация')
  })

  it ('Регистрация пользователя с существующим именем', () => {
    cy.get('input#input-19')
    .type("test5")

    cy.get('input#input-23')
    .type("unique@unique.com")

    cy.get('input#input-27')
    .type("1231235")

    cy.get('input#input-31')
    .type("1231235")

    cy.get('.v-btn.v-btn--contained.theme--light.v-size--default.success')
    .click()
    
    cy.get('.v-alert.warning > .v-alert__wrapper > .v-alert__content > .row > .shrink > .v-icon', { delay: 2000 } )
    .click()
    
    cy.get('input#input-23')
    .clear()
    .type("test5@ya.com")
    
    cy.get('.v-btn.v-btn--contained.theme--light.v-size--default.success')
    .click()

    cy.get('.v-alert.warning > .v-alert__wrapper > .v-alert__content > .row > .shrink > .v-icon', { delay: 2000 } )
    .click()
    
    cy.get('input#input-19')
    .clear()
    .type("test_unique")
    
    cy.get('input#input-23')
    .clear()
    .type("unique@unique.com")
    
    cy.get('.v-btn.v-btn--contained.theme--light.v-size--default.success')
    .click()
    
    cy.get('.success > .v-alert__wrapper > .v-alert__content > .row > .shrink > .v-icon', { delay: 2000 } )
    .click()

    
  })

});
