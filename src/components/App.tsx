import { useEffect, useState } from "react";
import Header from "./Header";
import CategorySelection from "./CategorySelection";
import JokeItem from "./JokeItem";
import Pagination from "./Pagination";
import Footer from "./Footer";
import JokeDetails from "./JokeDetails";
import { jokeItemT, ratingT } from "../lib/types";
import { MAX_JOKES, RESULTS_PER_PAGE } from "../lib/constants";
import { useLocalStorage } from "../lib/hooks";

function App() {
  const [jokeItems, setJokeItems] = useState<jokeItemT[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showJoke, setShowJoke] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<ratingT[]>(
    "bookmarkedIds",
    []
  );
  //

  //
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/random/${MAX_JOKES}`
      );
      const data = await response.json();
      setJokeItems(data);
    };
    getData();
  }, []);
  //

  const filteredJokes =
    jokeItems?.filter(
      (joke) => selectedCategory === "all" || joke.type === selectedCategory
    ) || [];
  const jokeItemsSliced = filteredJokes?.slice(startIndex, endIndex);
  const totalJokes = filteredJokes.length;

  return (
    <div className="container">
      <Header
        title="Jokes for free"
        subtitle="Became the funniest person in your meetings"
      />
      <div className="control">
        <aside className="jokesSelection">
          <CategorySelection
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <ul className="jokesList">
            {jokeItemsSliced.length === 0 && (
              <div className="emptyJoker">No jokes found in this category</div>
            )}
            {jokeItemsSliced?.map((joke) => (
              <JokeItem
                key={joke.id}
                text={joke.setup}
                id={joke.id}
                setBookmarkedIds={setBookmarkedIds}
                bookmarkedIds={bookmarkedIds}
              />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalJokes={totalJokes}
          />
        </aside>
        <JokeDetails showJoke={showJoke} setShowJoke={setShowJoke} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
