import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  defaultColor,
  changingColor,
  modifiedColor,
  testInputValueSelector,
  testCircleSelector,
} from "../../src/constants/constants";

describe("Тестирование строки", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it("Проверка инпута на пустотут, кнопка добавления недоступна", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Проверка строки на реверс со стилями.", function () {
    const stringLength = 5;
    const originalString = "hello";
    const firstStepColorsArr = [
      changingColor,
      defaultColor,
      defaultColor,
      defaultColor,
      changingColor,
    ];

    const inProcessString = "oellh";
    const secondStepColorsArr = [
      modifiedColor,
      changingColor,
      defaultColor,
      changingColor,
      modifiedColor,
    ];

    const finalString = "olleh";
    const finaStepColorsArr = [
      modifiedColor,
      modifiedColor,
      modifiedColor,
      modifiedColor,
      modifiedColor,
    ];

    cy.get(testInputValueSelector).type(originalString);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(testCircleSelector).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(originalString[index]);
      cy.get($el).should("have.css", "border-color", firstStepColorsArr[index]);
    });

    cy.wait(DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index, $list) => {
        cy.get($list).should("have.length", stringLength);
        cy.get($el).contains(inProcessString[index]);
        cy.get($el).should(
          "have.css",
          "border-color",
          secondStepColorsArr[index]
        );
      });
    });

    cy.wait(DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).each(($el, index, $list) => {
        cy.get($list).should("have.length", stringLength);
        cy.get($el).contains(finalString[index]);
        cy.get($el).should(
          "have.css",
          "border-color",
          finaStepColorsArr[index]
        );
      });
    });
  });
});
