import { ElementStates } from "../../types/element-states";
import {
  bubbleSortAscending,
  bubbleSortDescending,
  choiceSortAscending,
  choiceSortDescending,
} from "./sorting-page";

let arrOneElement = [{ value: 1, color: ElementStates.Default }];

let arrSomeElement = [
  { value: 3, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
];

let arrSomeElementResultAscending = [
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
];

let arrSomeElementResultDescending = [
  { value: 3, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
];

const setArrayRandom = jest.fn();
const setLoader = jest.fn();

jest.setTimeout(30000);

describe("Тестирование страницы сортировки", () => {
  describe("Тестирование по возростанию", () => {
    it("Проверка на пустоту массивв", async () => {
      await choiceSortAscending([], setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из одного элемента", async () => {
      await choiceSortAscending(arrOneElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из нескольких элементов", async () => {
      await choiceSortAscending(arrSomeElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenLastCalledWith(
        arrSomeElementResultAscending
      );
    });
  });

  describe("Тестирование по убыванию", () => {
    it("Проверка на пустоту массивв", async () => {
      await choiceSortDescending([], setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из одного элемента", async () => {
      await choiceSortDescending(arrOneElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массивв из нескольких элементов", async () => {
      await choiceSortDescending(arrSomeElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenLastCalledWith(
        arrSomeElementResultDescending
      );
    });
  });
});

describe("Тестирование сортировки пузрьком", () => {
  describe("Тестирование по возростанию", () => {
    it("Проверка на пустоту массива", async () => {
      await bubbleSortAscending([], setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массивв из одного элемента", async () => {
      await bubbleSortAscending(arrOneElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из нескольких элементов", async () => {
      await bubbleSortAscending(arrSomeElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenLastCalledWith(
        arrSomeElementResultAscending
      );
    });
  });

  describe("Тестирование по убыванию", () => {
    it("Проверка на пустоту массива", async () => {
      await bubbleSortDescending([], setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из одного элемента", async () => {
      await bubbleSortDescending(arrOneElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenCalledTimes(0);
    });

    it("Проверка массива из нескольких элементов", async () => {
      await bubbleSortDescending(arrSomeElement, setLoader, setArrayRandom);
      expect(setArrayRandom).toHaveBeenLastCalledWith(
        arrSomeElementResultDescending
      );
    });
  });
});
