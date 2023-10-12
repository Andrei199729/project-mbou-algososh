import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setTime } from "../../utils/setTime";
import { Stack } from "./stack-page-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../utils/hooks/useForm";

type TStack = {
  value: string;
  color: ElementStates;
};

const stack = new Stack<TStack>();

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [arrayStack, setArrayStack] = useState<TStack[]>([]);
  const [loaderPush, setLoaderPush] = useState<boolean>(false);
  const [loaderPop, setLoaderPop] = useState<boolean>(false);
  const [loaderReset, setLoaderReset] = useState<boolean>(false);

  async function onSubmitPush(e: FormEvent<HTMLFormElement>) {
    setLoaderPush(true);
    e.preventDefault();
    if (values.value !== "") {
      stack.push({ value: values.value, color: ElementStates.Changing });
      setArrayStack([...stack.getElements()]);
    }
    await setTime(SHORT_DELAY_IN_MS);
    stack.getElements()[stack.getSize() - 1].color = ElementStates.Default;
    setValues({ value: "" });
    setLoaderPush(false);
  }

  async function onClickPop() {
    setLoaderPop(true);
    stack.getElements()[stack.getSize() - 1].color = ElementStates.Changing;
    setArrayStack([...stack.getElements()]);
    await setTime(SHORT_DELAY_IN_MS);
    stack.pop();
    setArrayStack([...stack.getElements()]);
    setLoaderPop(false);
  }

  async function onSubmitReset(e: FormEvent<HTMLFormElement>) {
    setLoaderReset(true);
    e.preventDefault();
    await setTime(SHORT_DELAY_IN_MS);
    stack.reset();
    setArrayStack([...stack.getElements()]);
    setLoaderReset(false);
  }

  return (
    <SolutionLayout title="Стек">
      <form
        action=""
        className={styles.form}
        onSubmit={onSubmitPush}
        onReset={onSubmitReset}
      >
        <div className={styles.box}>
          <Input
            extraClass={styles.inputSize}
            maxLength={4}
            isLimitText={true}
            value={values.value}
            name="value"
            onChange={handleChange}
          />
          <Button
            text="Добавить"
            type="submit"
            disabled={values.value === ""}
            isLoader={loaderPush}
          />
          <Button
            text="Удалить"
            type="button"
            onClick={onClickPop}
            disabled={!arrayStack.length}
            isLoader={loaderPop}
          />
        </div>

        <Button
          text="Очистить"
          type="reset"
          disabled={!arrayStack.length}
          isLoader={loaderReset}
        />
      </form>
      <div className={styles.stack}>
        {arrayStack.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.value}
              index={index}
              head={arrayStack.length - 1 === index ? "top" : null}
              state={item.color}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
