export default function Dishes({ dishes, onSelectedDish }) {
  if (!dishes) return;
  return (
    <ul className="list list-dishes">
      {dishes?.map((dish) => (
        <li key={dish.idMeal} onClick={() => onSelectedDish(dish.idMeal)}>
          <img src={dish.strMealThumb} alt={`${dish.strMeal} poster`} />
          <h3>{dish.strMeal}</h3>
          <div>
            <p>
              <span>Category: {dish.strCategory} </span>
              <span>Origin: {dish.strArea}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
