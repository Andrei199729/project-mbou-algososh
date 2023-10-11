import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { LinkedList } from "./list-page-class";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { setTime } from "../../utils/setTime";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

const list = new LinkedList<string>(["0", "34", "8", "1"]);

type TList = {
  value: string;
  color: ElementStates;
};

export const ListPage: React.FC = () => {
  const [valueMeaning, setValueMeaning] = useState<string>("");
  const [valueIndex, setValueIndex] = useState<string>("");
  const [arrList, setArrList] = useState<TList[]>([...list.getColorArray()]);
  const [addToHeadShow, setAddToHeadShow] = useState<boolean>(false);
  const [addToTailShow, setAddToTailShow] = useState<boolean>(false);
  const [addByIndexShow, setAddByIndexShow] = useState<boolean>(false);
  const [valueInd, setvalueInd] = useState<number>(0);
  const [loading, setLoading] = useState({
    loadingAddHead: false,
    loadingAddTail: false,
    loadingDeleteHead: false,
    loadingDeleteTail: false,
    loadingAddIndex: false,
    loadingDeleteIndex: false,
  });

  const [deleteByIndexShow, setDeleteByIndexShow] = useState<boolean>(false);
  const [deleteFromTheHeadShow, setDeleteFromTheHeadShow] =
    useState<boolean>(false);
  const [deleteFromTheTailShow, setDeleteFromTheTailShow] =
    useState<boolean>(false);
  const [circleValue, setCircleValue] = useState<string>("");

  useEffect(() => {
    setArrList([...list.getColorArray()]);
  }, []);

  async function addMeaningHead() {
    if (valueMeaning !== "" && list.getSize < 6) {
      setLoading({ ...loading, loadingAddHead: true });
      setvalueInd(0);
      setAddToHeadShow(true);
      await setTime(SHORT_DELAY_IN_MS);
      list.prepend(valueMeaning);
      setAddToHeadShow(false);
      const newArr = list.getColorArray();
      newArr[0].color = ElementStates.Modified;
      setArrList(newArr);
      await setTime(SHORT_DELAY_IN_MS);
      newArr[0].color = ElementStates.Default;
      setArrList(newArr);
    }
    setLoading({ ...loading, loadingAddHead: false });
    setValueMeaning("");
  }

  async function addMeaningTail() {
    if (valueMeaning && list.getSize < 6) {
      setLoading({ ...loading, loadingAddTail: true });
      setvalueInd(list.getSize - 1);
      setAddToTailShow(true);
      await setTime(SHORT_DELAY_IN_MS);
      list.append(valueMeaning);
      setAddToTailShow(false);
      const newArr = list.getColorArray();
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArrList(newArr);
      await setTime(SHORT_DELAY_IN_MS);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArrList(newArr);
    }
    setLoading({ ...loading, loadingAddTail: false });
    setValueMeaning("");
  }

  async function deleteMeaningHead() {
    if (list.getSize > 0) {
      const newArr = list.getColorArray();
      setCircleValue(newArr[0].value);
      setLoading({ ...loading, loadingDeleteHead: true });
      setDeleteFromTheHeadShow(true);
      setvalueInd(0);
      newArr[0].value = "";
      setArrList(newArr);
      await setTime(SHORT_DELAY_IN_MS);
      list.deleteHead();
      setDeleteFromTheHeadShow(false);
      setArrList(list.getColorArray());
    }
    setLoading({ ...loading, loadingDeleteHead: false });
  }

  async function deleteMeaningTail() {
    if (list.getSize > 0) {
      const newArr = list.getColorArray();
      setCircleValue(newArr[newArr.length - 1].value);
      setLoading({ ...loading, loadingDeleteTail: true });
      setDeleteFromTheTailShow(true);
      setvalueInd(newArr.length - 1);
      newArr[newArr.length - 1].value = "";
      setArrList(newArr);
      await setTime(SHORT_DELAY_IN_MS);
      list.deleteTail();
      setDeleteFromTheTailShow(false);
      setArrList(list.getColorArray());
    }
    setLoading({ ...loading, loadingDeleteTail: false });
  }

  async function addByIndex() {
    const ind = Number(valueIndex);
    if (ind < 6 && list.getSize < 6) {
      setLoading({ ...loading, loadingAddIndex: true });
      setAddByIndexShow(true);
      const newArr = list.getColorArray();
      for (let i = 0; i <= ind; i++) {
        setvalueInd(i);
        await setTime(SHORT_DELAY_IN_MS);
        if (i < ind) {
          newArr[i].color = ElementStates.Changing;
          setArrList(newArr);
        }
      }
      setAddByIndexShow(false);
      setvalueInd(Number(""));
      list.insertAt(valueMeaning, ind);
      const finalArr = list.getColorArray();
      finalArr[ind].color = ElementStates.Modified;
      setArrList(finalArr);
      await setTime(SHORT_DELAY_IN_MS);
      finalArr[ind].color = ElementStates.Default;
      setArrList(finalArr);
    }
    setLoading({ ...loading, loadingAddIndex: false });
    setValueIndex("");
    setValueMeaning("");
  }

  async function deleteByIndex() {
    const ind = Number(valueIndex);
    if (ind < list.getSize && ind < 7) {
      setLoading({ ...loading, loadingDeleteIndex: true });
      const newArr = list.getColorArray();
      for (let i = 0; i <= ind; i++) {
        await setTime(SHORT_DELAY_IN_MS);
        newArr[i].color = ElementStates.Changing;
        setArrList([...newArr]);
      }
      await setTime(SHORT_DELAY_IN_MS);
      setCircleValue(newArr[ind].value);
      newArr[ind].value = "";
      setDeleteByIndexShow(true);
      newArr[ind].color = ElementStates.Default;
      setvalueInd(ind);
      await setTime(SHORT_DELAY_IN_MS);
      list.deleteAt(ind);
      setArrList(list.getColorArray());
      setDeleteByIndexShow(false);
    }
    setLoading({ ...loading, loadingDeleteIndex: false });
    setValueIndex("");
  }

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadShow && !addByIndexShow) {
      return HEAD;
    } else if (index === 0 && addByIndexShow && valueInd !== 0) {
      return HEAD;
    } else {
      return "";
    }
  };

  const showTail = (index: number) => {
    if (
      index === arrList.length - 1 &&
      !deleteFromTheTailShow &&
      !deleteByIndexShow
    ) {
      return TAIL;
    } else if (arrList.length === 1) {
      return "";
    } else if (deleteByIndexShow && index === arrList.length - 1) {
      return "";
    } else {
      return "";
    }
  };

  const disabled = (value: string, loading: boolean) =>
    value === "" || loading ? true : false;

  const disabledDelete = (arr: TList[], loading: boolean) =>
    arr.length === 0 || loading ? true : false;

  const disabledDeleteByIndex = (
    arr: TList[],
    loading: boolean,
    value: string
  ) =>
    arr.length === 0 ||
    loading ||
    !value ||
    +value < 0 ||
    +value > arr.length - 1
      ? true
      : false;

  const disabledByIndex = (value: string, loading: boolean, arr: TList[]) =>
    value === "" || loading || !value || +value < 0 || +value > arr.length - 1
      ? true
      : false;

  const loadingAll =
    loading.loadingAddHead ||
    loading.loadingAddIndex ||
    loading.loadingAddTail ||
    loading.loadingDeleteHead ||
    loading.loadingDeleteIndex ||
    loading.loadingDeleteTail;

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.box}>
          <Input
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            extraClass={styles.inputList}
            value={valueMeaning}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValueMeaning(e.target.value)
            }
          />
          <Button
            text="Добавить в head"
            type="button"
            extraClass={styles.buttonSymbol}
            onClick={addMeaningHead}
            isLoader={loading.loadingAddHead}
            disabled={disabled(valueMeaning, loading.loadingAddHead)}
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={addMeaningTail}
            extraClass={styles.buttonSymbol}
            isLoader={loading.loadingAddTail}
            disabled={disabled(valueMeaning, loading.loadingAddTail)}
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={deleteMeaningHead}
            extraClass={styles.buttonSymbol}
            isLoader={loading.loadingDeleteHead}
            disabled={disabledDelete(arrList, loading.loadingDeleteHead)}
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={deleteMeaningTail}
            extraClass={styles.buttonSymbol}
            isLoader={loading.loadingDeleteTail}
            disabled={disabledDelete(arrList, loading.loadingDeleteTail)}
          />
        </div>
        <div className={styles.box}>
          <Input
            placeholder="Введите индекс"
            type="number"
            extraClass={styles.inputList}
            value={valueIndex}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValueIndex(e.target.value)
            }
          />
          <Button
            text="Добавить по индексу"
            type="button"
            onClick={addByIndex}
            extraClass={styles.buttonIndex}
            isLoader={loading.loadingAddIndex}
            disabled={disabledByIndex(
              valueIndex,
              loading.loadingAddIndex,
              arrList
            )}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={deleteByIndex}
            extraClass={styles.buttonIndex}
            isLoader={loading.loadingDeleteIndex}
            disabled={disabledDeleteByIndex(
              arrList,
              loading.loadingDeleteIndex,
              valueIndex
            )}
          />
        </div>
      </div>
      <div className={styles.boxCircle}>
        {arrList.map((item, index) => {
          return (
            <div key={index} className={styles.stack}>
              <div className={`${styles.small}`}>
                {loadingAll === true &&
                  (addToHeadShow === true ||
                    addToTailShow === true ||
                    addByIndexShow === true) &&
                  index === valueInd && (
                    <div data-testid="topCircle" className={styles.topCircle}>
                      <Circle
                        isSmall
                        letter={valueMeaning}
                        state={ElementStates.Changing}
                      />
                    </div>
                  )}
                <Circle
                  key={index}
                  letter={item.value}
                  index={index}
                  head={showHead(index)}
                  tail={showTail(index)}
                  state={item.color}
                />
                {loadingAll === true &&
                  (deleteFromTheHeadShow === true ||
                    deleteFromTheTailShow === true ||
                    deleteByIndexShow === true) &&
                  index === valueInd && (
                    <div className={styles.bottomCircel}>
                      <Circle
                        isSmall
                        letter={circleValue}
                        state={ElementStates.Changing}
                      />
                    </div>
                  )}
              </div>
              {arrList.length - 1 !== index && (
                <div>
                  <ArrowIcon />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
