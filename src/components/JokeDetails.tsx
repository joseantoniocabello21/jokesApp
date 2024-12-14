import { useEffect, useState } from "react";
import { useActiveId } from "../lib/hooks";
import { jokeItemT } from "../lib/types";

type JokeDetailsProps = {
  showJoke: string;
  setShowJoke: (showJoke: string) => void;
};

export default function JokeDetails({
  showJoke,
  setShowJoke,
}: JokeDetailsProps) {
  const id = useActiveId();
  const [jokeData, setJokeData] = useState<jokeItemT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowJoke("");
    const getData = async () => {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${id}`
      );
      const data = await response.json();
      setJokeData(data);
      setLoading(false);
    };
    id !== null && id !== 0 && getData();
  }, [id]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowJoke("jokeDetails__punchline--active");
  };

  return (
    <main className="jokeDetails">
      <div className="jokeDetails__container">
        {jokeData && jokeData.id !== 0 && !loading ? (
          <>
            <h3 className="jokeDetails__id">Joke {jokeData.id}</h3>
            <p className="jokeDetails__entry">{jokeData.setup}</p>
            <button onClick={handleClick} className="jokeDetails__show">
              Get it!
            </button>
            <p className={`jokeDetails__punchline ${showJoke}`}>
              {jokeData.punchline}
            </p>
          </>
        ) : (
          <h3 className="jokeDetails__id">Select a joke from the list</h3>
        )}
      </div>
    </main>
  );
}
