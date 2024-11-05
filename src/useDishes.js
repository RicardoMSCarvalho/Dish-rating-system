import { useState, useEffect } from "react";

export function useDishes(query) {
  const KEY = "1";
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchDishes() {
        try {
          setIsLoading(true);
          setError("");
          if (query.length < 3) return;
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/${KEY}/search.php?s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong while fetching dish");
          const data = await res.json();

          if (!data.Response === "False") {
            throw new Error("Results not found");
          }
          setDishes(data.meals);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchDishes();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { error, isLoading, dishes };
}
