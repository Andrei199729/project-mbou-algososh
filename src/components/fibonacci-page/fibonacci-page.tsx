import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";
import { setTime } from "../../utils/setTime";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../utils/hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [loader, setLoader] = useState<boolean>(false);
  const [fibonacciValueNumberArray, setFibonacciValueNumberArray] = useState<
    number[]
  >([]);

  async function onSubmitExpand(e: FormEvent<HTMLFormElement>) {
    setLoader(true);
    e.preventDefault();
    const arr = fibonacci(Number(values.value));
    for (let i = 0; i < arr.length; i++) {
      await setTime(SHORT_DELAY_IN_MS);
      setFibonacciValueNumberArray(arr.slice(0, i + 1));
    }
    setValues({ value: "" });
    setLoader(false);
  }

  function fibonacci(num: number) {
    if (num === 1 || num === 0) {
      return [1, 1];
    } else {
      let s: number[] = fibonacci(num - 1);

      s.push(s[s.length - 2] + s[s.length - 1]);
      return s;
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmitExpand}>
        <Input
          type="number"
          max={19}
          isLimitText={true}
          value={values.value}
          name="value"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.value.length <= 19 && handleChange(e)
          }
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={loader}
          disabled={values.value === ""}
        />
      </form>
      <div
        className={`${styles.box} ${
          fibonacciValueNumberArray.length > 10 && styles["box-start"]
        }`}
      >
        {fibonacciValueNumberArray?.map((item, index) => {
          return <Circle key={index} letter={item.toString()} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
