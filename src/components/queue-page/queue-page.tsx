import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Queue } from "./queue-page-class";
import { ElementStates } from "../../types/element-states";
import { setTime } from "../../utils/setTime";

type TQueue = {
  value?: string;
  color: ElementStates;
  head?: "head";
};

const queue = new Queue<TQueue>(7);

export const QueuePage: React.FC = () => {
  const queueArray = Array.from({ length: 7 }, () => ({
    value: "",
    color: ElementStates.Default,
  }));

  const [arrayQueue, setArrayQueue] = useState<TQueue[]>(queueArray);
  const [valueQueue, setValueQueue] = useState<string>("");
  const [loaderEnqueue, setLoaderEnqueue] = useState<boolean>(false);
  const [loaderDequeue, setLoaderDequeue] = useState<boolean>(false);
  const [loaderReset, setLoaderReset] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  async function onSubmitEnqueue(e: FormEvent<HTMLFormElement>) {
    setLoaderEnqueue(true);
    e.preventDefault();
    if (valueQueue !== "") {
      setValueQueue("");
      queue.enqueue({ value: valueQueue, color: ElementStates.Default });
      arrayQueue[queue.tail - 1] = { value: "", color: ElementStates.Changing };
      setArrayQueue([...arrayQueue]);
      await setTime(500);
      arrayQueue[queue.tail - 1] = {
        value: valueQueue,
        color: ElementStates.Changing,
      };
      setArrayQueue([...arrayQueue]);
      arrayQueue[queue.tail - 1] = {
        value: valueQueue,
        color: ElementStates.Default,
      };
      setArrayQueue([...arrayQueue]);
    }
    if (queue.length >= queue.size) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setLoaderEnqueue(false);
  }

  async function onClickDequeue() {
    setLoaderDequeue(true);
    queue.dequeue();
    arrayQueue[queue.head - 1] = {
      value: "",
      color: ElementStates.Changing,
    };

    setArrayQueue([...arrayQueue]);
    console.log(arrayQueue);

    arrayQueue[queue.head - 1] = {
      value: "",
      color: ElementStates.Default,
    };

    setArrayQueue([...arrayQueue]);
    console.log(arrayQueue);

    if (queue.tail === 7 && queue.head === 7 && queue.isEmpty()) {
      arrayQueue[queue.head - 1] = {
        value: "",
        color: ElementStates.Default,
        head: "head",
      };
      setArrayQueue([...arrayQueue]);
      console.log(arrayQueue);
    }
    await setTime(500);
    if (queue.length >= queue.size) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setLoaderDequeue(false);
    console.log(arrayQueue);
  }

  async function onSubmitReset(e: FormEvent<HTMLFormElement>) {
    setLoaderReset(true);
    e.preventDefault();
    await setTime(500);
    queue.reset();
    setArrayQueue(queueArray);
    setLoaderReset(false);
  }

  return (
    <SolutionLayout title="Очередь">
      <form
        action=""
        className={styles.form}
        onSubmit={onSubmitEnqueue}
        onReset={onSubmitReset}
      >
        <div className={styles.box}>
          <Input
            extraClass={styles.inputSize}
            maxLength={4}
            isLimitText={true}
            value={valueQueue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValueQueue(e.target.value)
            }
          />
          <Button
            text="Добавить"
            type="submit"
            disabled={valueQueue === "" || disabled}
            isLoader={loaderEnqueue}
          />
          <Button
            text="Удалить"
            type="button"
            onClick={onClickDequeue}
            disabled={queue.isEmpty()}
            isLoader={loaderDequeue}
          />
        </div>
        <Button text="Очистить" type="reset" isLoader={loaderReset} />
      </form>
      <div className={styles.stack}>
        {arrayQueue.slice(0, 7).map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.value}
              index={index}
              head={
                (index === queue.head && !queue.isEmpty()) || item.head
                  ? "head"
                  : null
              }
              tail={
                index === queue.tail - 1 && !queue.isEmpty() ? "tail" : null
              }
              state={item.color}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
