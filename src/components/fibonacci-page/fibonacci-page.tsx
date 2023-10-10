import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";
import { setTime } from "../../utils/setTime";

export const FibonacciPage: React.FC = () => {
  const [fibonacciValue, setFibonacciValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [fibonacciValueNumberArray, setFibonacciValueNumberArray] = useState<
    number[]
  >([]);

  async function onSubmitExpand(e: FormEvent<HTMLFormElement>) {
    setLoader(true);
    e.preventDefault();
    const arr = fibonacci(Number(fibonacciValue));
    for (let i = 0; i < arr.length; i++) {
      await setTime(500);
      setFibonacciValueNumberArray(arr.slice(0, i + 1));
    }
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
          value={fibonacciValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFibonacciValue(e.target.value)
          }
        />
        <Button type="submit" text="Развернуть" isLoader={loader} />
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
