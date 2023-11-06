import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  defaultColor,
  testInputValueSelector,
  testCircleSelector,
} from "../../src/constants/constants";

describe("Тестирование фибоначчи", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("Проверка инпута на пустоту, кнопка добавления недоступна", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Проверка, что числа генерируются корректно", function () {
    const numberFibonacci = 6;
    const fibonacciArr = [1, 1, 2, 3, 5, 8, 13];

    cy.get(testInputValueSelector).type(numberFibonacci);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(testCircleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
        cy.get($el).should("have.css", "border-color", defaultColor);
      });
    });
  });
});
