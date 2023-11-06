import { testUrl } from "../../src/constants/constants";

describe("Приложение работает", function () {
  it("Подключение к главной странице", function () {
    cy.visit(testUrl);
  });
});
