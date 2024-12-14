import { ratingT } from "../lib/types";
import Rating from "./Rating";

type JokeItemProps = {
  text: string;
  id: number;
  setBookmarkedIds: React.Dispatch<React.SetStateAction<ratingT[]>>;
  bookmarkedIds: ratingT[];
};

export default function JokeItem({
  text,
  id,
  setBookmarkedIds,
  bookmarkedIds,
}: JokeItemProps) {
  return (
    <li className="joke">
      <a className="joke__link" href={`#${id}`}>
        <div className="joke__content">
          <p className="joke__text">{text}</p>
        </div>
        <Rating
          id={id}
          setBookmarkedIds={setBookmarkedIds}
          bookmarkedIds={bookmarkedIds}
        />
      </a>
    </li>
  );
}
