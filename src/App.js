import { useState } from "react";
import { useDishes } from "./useDishes";
import { useLocalstoragestage } from "./useLocalstoragestage";
import Box from "./Components/Box";
import Dishes from "./Components/Dishes";
import Loader from "./Messages/Loader";
import ErrorMessage from "./Messages/ErrorMessage";
import Main from "./Components/Main";
import SearchInput from "./Components/SearchInput";
import Results from "./Components/Results";
import Navbar from "./Components/Navbar";
import TastedDishSummary from "./Components/TastedDishSummary";
import DishTastedList from "./Components/DishTastedList";
import DishDetails from "./Components/DishDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { dishes, error, isLoading } = useDishes(query);
  const [tasted, setTasted] = useLocalstoragestage([], "Tasted");

  function handleSelectedId(id) {
    setSelectedId(id === selectedId ? null : id);
  }
  function clearSelectedId() {
    setSelectedId(null);
  }
  function handleTastedDish(data) {
    setTasted((tst) => [...tst, data]);
  }
  function handleDeleteTasted(id) {
    setTasted((tst) => tst.filter((n) => n.idMeal !== id));
  }

  return (
    <>
      <Navbar>
        <SearchInput query={query} setQuery={setQuery} />
        <Results dishes={dishes} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Dishes dishes={dishes} onSelectedDish={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <DishDetails
              onHandleTasted={handleTastedDish}
              selectedId={selectedId}
              onClearSelectId={clearSelectedId}
              tasted={tasted}
            />
          ) : (
            <>
              <TastedDishSummary tasted={tasted} />
              <DishTastedList
                tasted={tasted}
                onRemoveTasted={handleDeleteTasted}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
