import React, { ChangeEvent, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { setTime } from "../../utils/setTime";

type TArraySort = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [arrayRandom, setArrayRandom] = useState<TArraySort[]>([]);
  const [checkSort, setCheckSort] = useState("выбор");
  const [loaderAscending, setLoaderAscending] = useState<boolean>(false);
  const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  function randomArr() {
    let array: TArraySort[] = [];
    let minLen = 3;
    let maxLen = 17;
    let minRange = 0;
    let maxRange = 100;
    let max = Math.max(minRange, maxRange);
    let min = Math.min(minRange, maxRange);
    let length = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen);
    for (let i = 0; i < length; i++) {
      array.push({
        value: Math.floor(Math.random() * (max - min + 1) + min),
        color: ElementStates.Default,
      });
    }
    setArrayRandom(array);
  }

  async function choiceSortAscending(arr: TArraySort[]) {
    setLoaderAscending(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let indexMin = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArrayRandom([...arr]);
        await setTime(1000);
        if (arr[indexMin].value > arr[j].value) {
          indexMin = j;
        }
        arr[j].color = ElementStates.Default;
        setArrayRandom([...arr]);
      }
      [arr[i].value, arr[indexMin].value] = [arr[indexMin].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setArrayRandom([...arr]);
    setLoaderAscending(false);
  }

  async function choiceSortDescending(arr: TArraySort[]) {
    setLoaderDescending(true);

    for (let i = 0; i < arr.length - 1; i++) {
      let indexMin = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArrayRandom([...arr]);
        await setTime(1000);
        if (arr[indexMin].value < arr[j].value) {
          indexMin = j;
        }
        arr[j].color = ElementStates.Default;
        setArrayRandom([...arr]);
      }
      [arr[i].value, arr[indexMin].value] = [arr[indexMin].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setArrayRandom([...arr]);
    setLoaderDescending(false);
  }

  async function bubbleSortAscending(arr: TArraySort[]) {
    setLoaderAscending(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArrayRandom([...arr]);
        await setTime(1000);
        if (arr[j].value > arr[j + 1].value) {
          let tmp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = tmp;
          arr[j + 1].color = ElementStates.Modified;
        }
        arr[j].color = ElementStates.Default;
        setArrayRandom([...arr]);
      }
      setArrayRandom(arr);
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setLoaderAscending(false);
  }

  async function bubbleSortDescending(arr: TArraySort[]) {
    setLoaderDescending(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArrayRandom([...arr]);
        await setTime(1000);
        if (arr[j].value < arr[j + 1].value) {
          let tmp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = tmp;
          arr[j + 1].color = ElementStates.Modified;
        }
        arr[j].color = ElementStates.Default;
        setArrayRandom([...arr]);
      }
      arr[arr.length - 1 - i].color = ElementStates.Modified;
      setArrayRandom(arr);
    }
    setLoaderDescending(false);
  }

  function onChangeRadio(e: ChangeEvent<HTMLInputElement>) {
    setCheckSort(e.target.value);
  }

  async function onClickHandler(sorting: Direction) {
    if (checkSort === "выбор" && sorting === Direction.Ascending) {
      setDisabled(true);
      await choiceSortAscending(arrayRandom);
      setDisabled(false);
    }

    if (checkSort === "выбор" && sorting === Direction.Descending) {
      setDisabled(true);
      await choiceSortDescending(arrayRandom);
      setDisabled(false);
    }

    if (checkSort === "пузырёк" && sorting === Direction.Ascending) {
      setDisabled(true);
      await bubbleSortAscending(arrayRandom);
      setDisabled(false);
    }

    if (checkSort === "пузырёк" && sorting === Direction.Descending) {
      setDisabled(true);
      await bubbleSortDescending(arrayRandom);
      setDisabled(false);
    }
  }

  useEffect(() => {
    randomArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива" extraClass={styles.position}>
      <div className={styles.sorting}>
        <div className={styles.radioInputs}>
          <RadioInput
            label="Выбор"
            value="выбор"
            checked={checkSort === "выбор" ? true : false}
            onChange={onChangeRadio}
            disabled={disabled}
          />
          <RadioInput
            label="Пузырёк"
            value="пузырёк"
            checked={checkSort === "пузырёк" ? true : false}
            onChange={onChangeRadio}
            disabled={disabled}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => onClickHandler(Direction.Ascending)}
            isLoader={loaderAscending}
            disabled={disabled}
            extraClass={styles.buttonAscending}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => onClickHandler(Direction.Descending)}
            isLoader={loaderDescending}
            disabled={disabled}
            extraClass={styles.buttonDescending}
          />
        </div>

        <Button
          type="button"
          text="Новый массив"
          onClick={randomArr}
          disabled={disabled}
        />
      </div>
      <div className={styles.columns}>
        {arrayRandom.map((item: TArraySort, index: number) => {
          return <Column key={index} index={item.value} state={item.color} />;
        })}
      </div>
    </SolutionLayout>
  );
};
