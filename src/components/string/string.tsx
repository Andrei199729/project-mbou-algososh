import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setTime } from "../../utils/setTime";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../utils/hooks/useForm";

type TString = {
  colorElementStates: ElementStates;
  value: string;
};

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ value: "" });

  const [stringValueArray, setStringValueArray] = useState<Array<TString>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const swap = (arr: TString[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  };

  function onSubmitExpand(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let stringArray = values.value.split("").map((letter: string) => {
      return { colorElementStates: ElementStates.Default, value: letter };
    });

    reverseString(stringArray);
  }

  async function reverseString(str: TString[]) {
    setLoader(true);
    for (let i = str.length - 1; i >= (str.length - 1) / 2; i--) {
      let b = str.length - 1 - i;
      if (i !== b) {
        str[i].colorElementStates = ElementStates.Changing;
        str[b].colorElementStates = ElementStates.Changing;
        setStringValueArray([...str]);
        await setTime(DELAY_IN_MS);
      }
      swap(str, i, b);
      str[i].colorElementStates = ElementStates.Modified;
      str[b].colorElementStates = ElementStates.Modified;
      setStringValueArray([...str]);
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmitExpand}>
        <Input
          type="text"
          maxLength={11}
          isLimitText={true}
          name="value"
          value={values.value}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Развернуть"
          extraClass={styles.buttonString}
          isLoader={loader}
          disabled={values.value === ""}
        />
      </form>
      <div className={styles.box}>
        {stringValueArray?.map((item: TString, index: number) => {
          return (
            <Circle
              key={index}
              letter={item.value}
              state={item.colorElementStates}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
