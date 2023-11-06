import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  defaultColor,
  changingColor,
  testInputValueSelector,
  testCircleSelector,
  testButtonAddSelector,
  testTextHeadSelector,
  testButtonDelSelector,
  testButtonResetSelector,
} from "../../src/constants/constants";

describe("Тестирование стека", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/stack`);
  });

  it("Проверка инпута на пустоту, кнопка добавления недоступна", function () {
    cy.get(testInputValueSelector).should("be.empty");
    cy.get("button").should("be.disabled");
  });

  const one = 1;
  const two = 2;
  const three = 3;
  const arr = [1, 2, 3];

  it("Проверка правильности добавления элемента в стек.", function () {
    cy.get(testInputValueSelector).type(one);
    cy.get(testButtonAddSelector).click();

    cy.get(testCircleSelector)
      .eq(0)
      .should("have.css", "border-color", changingColor);
    cy.get(testTextHeadSelector).eq(0).contains("top");

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", defaultColor);
      cy.get(testInputValueSelector).type(two);
      cy.get(testButtonAddSelector).click();
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", changingColor)
        .contains(two);
      cy.get(testCircleSelector)
        .eq(1)
        .get(testTextHeadSelector)
        .contains("top");
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
      cy.get(testInputValueSelector).type(three);
      cy.get(testButtonAddSelector).click();
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", changingColor)
        .contains(three);
      cy.get(testCircleSelector)
        .eq(2)
        .get(testTextHeadSelector)
        .contains("top");
    });
  });

  it("Проверка правильности удаления элемента из стека.", function () {
    arr.forEach((text) => {
      cy.get("input").type(text);
      cy.get(testButtonAddSelector).click();
      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.get(testCircleSelector).as("circles");
      });
    });
    cy.get(testButtonDelSelector).click();

    cy.get(testCircleSelector).eq(2).contains(three);
    cy.get(testCircleSelector)
      .eq(2)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
      cy.get(testButtonDelSelector).click();
      cy.get(testCircleSelector)
        .eq(0)
        .get(testTextHeadSelector)
        .contains("top");
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", defaultColor);
      cy.get(testButtonDelSelector).click();
    });
  });

  it("Проверка reset", function () {
    arr.forEach((text) => {
      cy.get("input").type(text);
      cy.get(testButtonAddSelector).click();
      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.get(testCircleSelector).as("circles");
      });
    });
    cy.get(testButtonResetSelector).click();
    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should("have.length", 0);
      cy.get(testCircleSelector).should("not.be.exist");
    });
  });
});
