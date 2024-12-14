import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { RESULTS_PER_PAGE } from "../lib/constants";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalJokes: number;
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalJokes,
}: PaginationProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains("backward")) {
      setCurrentPage(currentPage - 1);
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  return (
    <section className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={handleClick}
        className="pagination__btn backward"
      >
        <ChevronLeftIcon />
      </button>

      <div className="counter">
        {totalJokes !== 0 ? currentPage : 0} /{" "}
        {Math.ceil(totalJokes / RESULTS_PER_PAGE)}
      </div>

      <button
        disabled={currentPage >= totalJokes / RESULTS_PER_PAGE}
        onClick={handleClick}
        className="pagination__btn forward"
      >
        <ChevronRightIcon />
      </button>
    </section>
  );
}
