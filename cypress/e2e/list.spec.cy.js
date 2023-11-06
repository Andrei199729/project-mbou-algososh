import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  defaultColor,
  changingColor,
  modifiedColor,
  testInputValueSelector,
  testCircleSelector,
  testButtonAddSelector,
  testTextHeadSelector,
  testButtonDelSelector,
  testButtonResetSelector,
  testTextTailSelector,
  testButtonAddHeadSelector,
  testButtonAddTailSelector,
  testButtonDelByIndexSelector,
  testButtonAddByIndexSelector,
  testInputSelector,
  testTopCircleSelector,
  testSmallCircleClass,
  testCircleContSelector,
  testArrowSelector,
  testIndexSelector,
  testbottomCircleSelector,
  testInputIndexSelector,
  testButtonDelHeadSelector,
  testButtonDelTailSelector,
} from "../../src/constants/constants";

import { HEAD, TAIL } from "../../src/constants/element-captions";

describe("Тестирование списка", function () {
  beforeEach(function () {
    cy.visit(`${testUrl}/list`);
  });

  const oneElement = 1;
  const oneIndex = 1;
  const arr = [0, 34, 8, 1];

  it("Проверка инпута на пустоту, кнопка добавления недоступна", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
    cy.get(testButtonAddHeadSelector).should("be.disabled");
    cy.get(testButtonAddTailSelector).should("be.disabled");
    cy.get(testButtonAddByIndexSelector).should("be.disabled");
    cy.get(testButtonDelByIndexSelector).should("be.disabled");
  });

  it("Проверка корректности отрисовки дефолтного списка", function () {
    cy.get(testCircleSelector).should("have.length", arr.length);
    cy.get(testCircleSelector).each(($circle, index) => {
      const expectedValue = arr[index];
      cy.wrap($circle).should("contain", expectedValue);
      cy.wrap($circle).should("have.css", "border-color", defaultColor);

      cy.wrap($circle).next("p").should("contain", index);
    });

    cy.get(`${testCircleSelector}:first`).prev("div").should("contain", HEAD);
    cy.get(`${testCircleSelector}:eq(3)`)
      .next("p")
      .next("div")
      .should("contain", TAIL);
  });

  it("Проверка добавления элемента в head", function () {
    cy.get(testInputSelector).should("be.empty");
    cy.get(testInputSelector).type(oneElement);
    cy.get(testButtonAddHeadSelector).click();

    cy.get(testTopCircleSelector);
    cy.get(testTopCircleSelector).contains(oneElement);
    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleContSelector).should("have.length", 5);
      cy.get(testArrowSelector).should("have.length", 4);
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", modifiedColor);
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(4).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });

  it("Проверка добавления элемента в tail", function () {
    cy.get(testInputSelector).should("be.empty");
    cy.get(testInputSelector).type(oneElement);
    cy.get(testButtonAddTailSelector).click();

    cy.get(testTopCircleSelector);
    cy.get(testTopCircleSelector).contains(oneElement);
    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleContSelector).should("have.length", 5);
      cy.get(testArrowSelector).should("have.length", 4);
      cy.get(testCircleSelector)
        .eq(4)
        .should("have.css", "border-color", modifiedColor);
      cy.get(testCircleSelector)
        .eq(4)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(4).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });

  it("Проверка добавления элемента по индексу", function () {
    cy.get(testInputSelector).should("be.empty");
    cy.get(testInputSelector).type(oneElement);

    cy.get(testInputIndexSelector).should("be.empty");
    cy.get(testInputIndexSelector).type(oneIndex);

    cy.get(testButtonAddByIndexSelector).click();

    cy.get(testTopCircleSelector);
    cy.get(testTopCircleSelector).contains(oneElement);

    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", changingColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);

      cy.get(testCircleContSelector).should("have.length", 5);
      cy.get(testArrowSelector).should("have.length", 4);

      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);

      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(4).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });

  it("Проверка удаления элемента из head", function () {
    cy.get(testButtonDelHeadSelector).click();

    cy.get(testbottomCircleSelector);
    cy.get(testbottomCircleSelector).contains(arr[0]);
    cy.get(testbottomCircleSelector)
      .find("[class*=small]")
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleContSelector).should("have.length", 3);
      cy.get(testArrowSelector).should("have.length", 2);
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", defaultColor);
      cy.get(testCircleSelector)
        .eq(0)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(2).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });

  it("Проверка удаления элемента из tail", function () {
    cy.get(testButtonDelTailSelector).click();

    cy.get(testbottomCircleSelector);
    cy.get(testbottomCircleSelector).contains(arr[3]);
    cy.get(testbottomCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleContSelector).should("have.length", 3);
      cy.get(testArrowSelector).should("have.length", 2);
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", defaultColor);
      cy.get(testCircleSelector)
        .eq(2)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(2).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });

  it("Проверка удаления элемента по индексу", function () {
    cy.get(testInputIndexSelector).should("be.empty");
    cy.get(testInputIndexSelector).type(oneIndex);

    cy.get(testButtonDelByIndexSelector).click();

    cy.get(testbottomCircleSelector);
    cy.get(testbottomCircleSelector).contains(arr[1]);

    cy.get(testbottomCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);

      cy.get(testCircleContSelector).should("have.length", 3);
      cy.get(testArrowSelector).should("have.length", 2);

      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);

      cy.get(testCircleSelector)
        .eq(1)
        .should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(testCircleSelector).should(
        "have.css",
        "border-color",
        defaultColor
      );
      cy.get(testTextHeadSelector).eq(0).should("contain", HEAD);
      cy.get(testTextTailSelector).eq(2).should("contain", TAIL);
      cy.get(testIndexSelector).each(($el, index, $list) => {
        cy.get($el).should("contain", index);
      });
    });
  });
});
