import { useState, useEffect, useCallback } from "react";
import { modifyData } from "./utils";
import { BASE_URL } from "./const";

export const useGetTodos = () => {
  const [dataState, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/todos.json `);
      if (!response.ok) {
        throw new Error("Ошибка запроса.");
      }
      const data = await response.json();

      const newData = modifyData(data);

      setData(newData);
    } catch (err) {
      setError(err.message || "Что-то пошло не так...");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    changeDataHandler();
  }, [changeDataHandler]);

  return { isLoading, error, data: dataState, refetch: changeDataHandler };
};
