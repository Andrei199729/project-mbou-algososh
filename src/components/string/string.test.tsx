import { reverseString } from "./string";
import { ElementStates } from "../../types/element-states";
const setStringValueArray = jest.fn();
const setLoader = jest.fn();

describe("Тестирование строки", () => {
  it("Проверка с чётным количеством символов", async () => {
    const testString = "1234"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Default }));

    const testStringReverse = "4321"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Modified }));

    await reverseString(testString, setLoader, setStringValueArray);
    expect(setStringValueArray).toHaveBeenLastCalledWith(testStringReverse);
  });

  it("Проверка с нечетным количеством символов", async () => {
    const testString = "123"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Default }));

    const testStringReverse = "321"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Modified }));

    await reverseString(testString, setLoader, setStringValueArray);
    expect(setStringValueArray).toHaveBeenLastCalledWith(testStringReverse);
  });

  it("Проверка с одним символом", async () => {
    const testString = "1"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Default }));

    const testStringReverse = "1"
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Modified }));
    await reverseString(testString, setLoader, setStringValueArray);
    expect(setStringValueArray).toHaveBeenLastCalledWith(testStringReverse);
  });

  it("Проверка пустой строки", async () => {
    const testString = ""
      .split("")
      .map((value) => ({ value, colorElementStates: ElementStates.Default }));

    await reverseString(testString, setLoader, setStringValueArray);
    expect(setStringValueArray).toHaveBeenCalledTimes(0);
  });
});
