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
  testTextTailSelector,
} from "../../src/constants/constants";

import { HEAD, TAIL } from "../../src/constants/element-captions";

describe("Тестирование очереди", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/queue`);
  });
  const one = 1;
  const two = 2;
  const three = 3;
  const arr = [1, 2, 3];

  it("Проверка инпута на пустоту, кнопка добавления недоступна", function () {
    cy.get(testInputValueSelector).should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Проверка добавления элемента в очередь", function () {
    cy.get(testCircleSelector).each(($list) => {
      cy.get($list).should("have.css", "border-color", defaultColor);
    });

    cy.get(testInputValueSelector).type(one);
    cy.get(testButtonAddSelector).click();

    cy.get(testCircleSelector)
      .eq(0)
      .should("have.css", "border-color", changingColor);
    cy.get(testTextHeadSelector).eq(0).contains(HEAD);
    cy.get(testTextTailSelector).eq(0).contains(TAIL);
    cy.get(testCircleSelector)
      .eq(0)
      .should("have.css", "border-color", defaultColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testInputValueSelector).type(two);
      cy.get(testButtonAddSelector).click();
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", changingColor);
      cy.get(testTextHeadSelector).eq(0).contains(HEAD);
      cy.get(testTextTailSelector).eq(1).contains(TAIL);
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testInputValueSelector).type(three);
      cy.get(testButtonAddSelector).click();
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", changingColor);
      cy.get(testTextHeadSelector).eq(0).contains(HEAD);
      cy.get(testTextTailSelector).eq(2).contains(TAIL);
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", defaultColor);
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
    cy.get(testInputValueSelector).type(one);
    cy.get(testCircleSelector)
      .eq(0)
      .should("have.css", "border-color", changingColor);
    cy.get(testTextHeadSelector).eq(1).contains(HEAD);
    cy.get(testTextTailSelector).eq(2).contains(TAIL);
    cy.get(testCircleSelector)
      .eq(0)
      .should("have.css", "border-color", defaultColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testButtonDelSelector).click();
      cy.get(testInputValueSelector).type(two);
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", changingColor);
      cy.get(testTextHeadSelector).eq(2).contains(HEAD);
      cy.get(testTextTailSelector).eq(2).contains(TAIL);
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testButtonDelSelector).click();
      cy.get(testInputValueSelector).type(three);
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", changingColor);
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", defaultColor);
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

    cy.get(testCircleSelector).should("have.length.above", 0);
    cy.get(testButtonResetSelector).click();

    cy.get(testCircleSelector).each(($list) => {
      cy.get($list).should("contain", "");
    });
  });
});
