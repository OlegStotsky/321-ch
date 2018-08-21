import * as React from "react";

interface ISearchBarProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.SFC<ISearchBarProps> = ({ query, onChange }) => (
  <input
    type="text"
    name="searchQuery"
    className="board__search-bar"
    placeholder="Search for OPs"
    value={query}
    onChange={onChange}
  />
);

export default SearchBar;
