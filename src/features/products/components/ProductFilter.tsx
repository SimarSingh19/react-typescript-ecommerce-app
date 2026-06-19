import { useEffect, useRef, useState } from "react";

import useDebounce from "../../../hooks/useDebounce";

type ProductFilterProps = {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
};

function ProductFilter({ searchTerm, onSearchChange, selectedCategory, categories, onCategoryChange, onClearFilters}: ProductFilterProps) {
  
    const [localSearch, setLocalSearch] = useState<string>(searchTerm);
  
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const previousSearchRef = useRef<string>("");
    
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
      previousSearchRef.current = searchTerm;
      onSearchChange(debouncedSearch);
    }, [debouncedSearch]);

    useEffect(() => {
      setLocalSearch(searchTerm);
    }, [searchTerm]);

    const handleClearFilters = () => {
      previousSearchRef.current = "";
      setLocalSearch("");
      onClearFilters();
      searchInputRef.current?.focus();
    };

    useEffect(() => {
      searchInputRef.current?.focus();
    }, []);

    return (
      <div className="">
        <div className="product_filter">
          <input ref={searchInputRef} type="text" placeholder="Search products..." value={localSearch}
              onChange={(e) => setLocalSearch(e.currentTarget.value)}/>
          <select value={selectedCategory}
            onChange={(e) => onCategoryChange(e.currentTarget.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button className="app_btn app_btn_light" onClick={handleClearFilters}>Clear Filters</button>

        </div>
          <div className="filter_info mb-0">
            Current Search: <strong>{searchTerm || "-"}</strong>
          </div>
        <br></br>
        <div className="filter_info">
          Previous Search: <strong>{previousSearchRef.current || "-"}</strong>
        </div>
    </div>
  );
}

export default ProductFilter;