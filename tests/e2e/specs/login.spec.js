
describe('Авторизация', () => {
  it('Переход на форму авторизации', () => {
    cy.visit('http://localhost:8080/login')
    cy.contains('h3', 'Форма авторизации')
  })

  it ('Проверка на существовании поля ввода почты', () => {
    cy.get('#input-19')
    .type("test5@ya.com");
  })

  it ('Проверка на существовании поля ввода пароля', () => {
    cy.get('#input-23')
    .type("1231234");
  })

  it ('Ошибка авторизации', () => {
    cy.get(".align-self-center.v-btn.v-btn--contained.theme--light.v-size--default.primary")
    .click();
  });

  it ('Закрытие преудпреждения', () => {
      cy.get(".shrink.col")
      .click();
  })

  it ('Проверка на существовании поля ввода почты', () => {
    cy.get('#input-19')
    .type("test5@ya.com");
  })

  it ('Проверка на существовании поля ввода пароля', () => {
    cy.get('#input-23')
    .type("1231235");
  })

  it ('Успешная авторизация', () => {
    cy.get(".align-self-center.v-btn.v-btn--contained.theme--light.v-size--default.primary")
    .click();
  });

})
