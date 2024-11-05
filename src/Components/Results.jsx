export default function Results({ dishes }) {
  if (!dishes) return;
  return (
    <p className="num-results">
      <strong>{dishes.length}</strong> results
    </p>
  );
}
