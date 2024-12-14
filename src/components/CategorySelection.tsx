import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";

type CategorySelectionProps = {
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
};

export default function CategorySelection({
  setSelectedCategory,
  setCurrentPage,
}: CategorySelectionProps) {
  const [jokeTypes, setJokeTypes] = useState<string[] | null>(null);
  //
  useEffect(() => {
    const getJokeTypes = async () => {
      const response = await fetch(`${API_URL}/types`);
      const data = await response.json();
      setJokeTypes(data);
    };
    getJokeTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="categories">
      Category:
      <select onChange={handleChange} name="category">
        <option value="all">All</option>
        {jokeTypes &&
          jokeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>
    </div>
  );
}
