import { useState, useEffect } from "react";
import Loader from "../Messages/Loader";
import StarRating from "../StarRating";
const KEY = "1";

export default function DishDetails({
  selectedId,
  onClearSelectId,
  onHandleTasted,
  tasted,
}) {
  const [dish, setDish] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isTasted = tasted.map((tast) => tast.idMeal).includes(selectedId);
  const tastedUserRating = tasted.find(
    (dish) => dish.idMeal === selectedId
  )?.userRating;

  const {
    strMeal: title,
    strCategory: category,
    strArea: origin,
    strMealThumb: image,
  } = dish;

  function handleAdd() {
    const newTastedDish = {
      idMeal: selectedId,
      title,
      category,
      image,
      origin,
      userRating,
    };
    onHandleTasted(newTastedDish);
    onClearSelectId();
  }
  useEffect(() => {
    async function getDishDetails() {
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/${KEY}/lookup.php?i=${selectedId}`
        );
        if (!res.ok) throw new Error("Failed to fetch dish details");
        const data = await res.json();

        setDish(data.meals[0]);
      } catch (error) {
        console.error("Error fetching dish details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      getDishDetails();
    }
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Dish: ${title}`;

      return function () {
        document.title = "Taste 2 Good";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {!loading ? (
        <>
          <header>
            <button className="btn-back" onClick={() => onClearSelectId()}>
              &larr;
            </button>
            <img src={image} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                📍{origin} &bull; {category}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isTasted ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={() => handleAdd()}>
                      + Add to tasted list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this dish {tastedUserRating} <span>🎇</span>
                </p>
              )}
              <p>
                <em>{title}</em>
              </p>
            </div>
          </section>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
}
