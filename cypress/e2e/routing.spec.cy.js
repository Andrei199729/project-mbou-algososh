import { testUrl } from "../../src/constants/constants";
describe("Приложение корректно работает с маршрутами", function () {
  before(function () {
    cy.visit(testUrl);
  });

  it("Переход на страницу 'cтрока' корректно работает", function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it("Переход на страницу 'фибоначчи' корректно работает", function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("Переход на страницу 'сортировка' корректно работает", function () {
    cy.visit(`${testUrl}/sorting`);
  });

  it("Переход на страницу 'стек' корректно работает", function () {
    cy.visit(`${testUrl}/stack`);
  });

  it("Переход на страницу 'очередь' корректно работает", function () {
    cy.visit(`${testUrl}/queue`);
  });

  it("Переход на страницу 'список' корректно работает", function () {
    cy.visit(`${testUrl}/list`);
  });
});
