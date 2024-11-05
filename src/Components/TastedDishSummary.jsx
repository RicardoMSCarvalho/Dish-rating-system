const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function TastedDishesSummary({ tasted }) {
  const avgUserRating = average(tasted.map((tast) => tast.userRating));

  return (
    <div className="summary">
      <h2>Dishes you tasted</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{tasted.length} dishes</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
