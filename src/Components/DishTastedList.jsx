export default function DishTastedList({ tasted, onRemoveTasted }) {
  return (
    <ul className="list">
      {tasted.map((dish) => (
        <li key={dish.idMeal}>
          <img src={dish.image} alt={`${dish.strMeal} poster`} />
          <h3>{dish.title}</h3>
          <div>
            <p>
              <span>⭐</span>
              <span>{dish.userRating}</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onRemoveTasted(dish.idMeal)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
