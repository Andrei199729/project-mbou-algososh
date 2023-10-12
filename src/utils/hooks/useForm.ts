import { ChangeEvent, useState } from "react";

type TValue = {
  value: string;
  index?: string;
};

export function useForm(inputValues: TValue) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
