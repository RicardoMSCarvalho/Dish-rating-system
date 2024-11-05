import { useRef } from "react";

export default function SearchInput({ query, setQuery }) {
  const inputEl = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search Dishes..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
