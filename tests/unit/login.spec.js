import { expect } from 'chai'
import Component from '../../src/views/Login.vue'

describe('Форма авторизации', () => {

  it('Имеет метод для авторизации', () => {
    expect(typeof Component.methods.logIn).to.equal('function')
  })

  it ('Имеет свойство для хранения значения почты', () => {
    const defaultData = Component.data()
    expect(typeof defaultData.email).to.equal('string')
  })

  it ('Имеет свойство для хранения значения пароля', () => {
    const defaultData = Component.data()
    expect(typeof defaultData.password).to.equal('string')
  })

  it('Объект Data у компонента существует', () => {
    expect(typeof Component.data).to.equal('function')
  })

})
