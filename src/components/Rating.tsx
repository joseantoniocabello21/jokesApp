import { ThickArrowUpIcon, ThickArrowDownIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { ratingT } from "../lib/types";

type RatingProps = {
  setBookmarkedIds: React.Dispatch<React.SetStateAction<ratingT[]>>;
  id: number;
  bookmarkedIds: ratingT[];
};

export default function Rating({
  setBookmarkedIds,
  id,
  bookmarkedIds,
}: RatingProps) {
  const good = useRef<HTMLButtonElement>(null);
  const bad = useRef<HTMLButtonElement>(null);

  //
  //
  const rating = bookmarkedIds.findLast((element) => element.id === id);
  //
  //
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    if (target.classList.contains("btn--good")) {
      setBookmarkedIds((prev) => [...prev, { id, rating: "good" }]);

      good.current?.classList.add("btn--good--active");
      bad.current?.classList.remove("btn--bad--active");
      return;
    }
    setBookmarkedIds((prev) => [...prev, { id, rating: "bad" }]);
    good.current?.classList.remove("btn--good--active");
    bad.current?.classList.add("btn--bad--active");
  };

  return (
    <div className="joke__footer">
      <button
        ref={good}
        onClick={handleClick}
        className={`btn btn--good ${
          rating?.id === id && rating?.rating === "good"
            ? "btn--good--active"
            : ""
        }`}
      >
        <ThickArrowUpIcon />
      </button>
      <button
        ref={bad}
        onClick={handleClick}
        className={`btn btn--bad ${
          rating?.id === id && rating?.rating === "bad"
            ? "btn--bad--active"
            : ""
        }`}
      >
        <ThickArrowDownIcon />
      </button>
    </div>
  );
}
