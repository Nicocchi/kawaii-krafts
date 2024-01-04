import { useLocalStorage } from "./useLocalStorage";

export const useLocalToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value) => {
    setValue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};
